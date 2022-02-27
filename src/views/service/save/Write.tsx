import {
  useEffect,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { styled } from 'twin.macro';
import { FormWrapper } from '~/components/form/FormWrapper';
import { FileCard } from '~/views/common/FileCard';
import { FormTextField } from '~/components/form/FormTextField';
import { Autocomplete } from '~/components/select/Autocomplete';
import { API_COMPANY } from '~/constants/apis/company';
import { useQueryApi } from '~/hooks/useQueryApi';
import { IResGetCompanySimpleList } from '~/types/apis/company/get.companySimpleList';
import { IFile, IFileRejection } from '~/components/file/FilePreviewDropzone';
import { toDefault } from '~/utils/commonUtils';
import { maxLengthProps, setErrorProps } from '~/utils/muiUtils';
import { range } from 'lodash';
import { IResGetServiceDetail } from '~/types/apis/service/get.serviceDetail';
import {
  IReqGetCodeList,
  IResGetCodeList,
} from '~/types/apis/common/get.codeList';
import { API_GET_CODE_LIST } from '~/constants/apis/common';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { yupNumber } from '~/utils/yupUtils';
import * as Yup from 'yup';

/** style */
const Container = styled.form(``);

/** ref */
export interface IRef {
  submit: () => void;
}

/** props */
interface IProps {
  className?: string;
  isModify: boolean;
  isFetching?: boolean;
  detailData?: IResGetServiceDetail;
  opSubmit: (data: IForm) => void;
}

/** 수정에 사용되는 이미지 정보 */
interface IImgDelInfos {
  /** 이미지 id */
  imgId?: number;
  /** 이미지 url */
  imgUrl?: string;
}

/** 이미지 등록/수정 공통 정보 */
interface IImgInfo {
  /** 이미지 구분자 (등록시에는 image id가 없으므로) */
  idx?: number;
  /** 이미지 path */
  imgPath?: string;
  /** file 객체 */
  fileObj?: IFile;
  /** 수정시 사용될 이미지 id */
  imgId?: number;
  /** 모바일 메인 노출 여부 */
  isMobileMain?: boolean;
  /** 대표 이미지 여부 */
  isMain?: boolean;
}

/** form */
export interface IForm {
  companyId: number | '';
  serviceName: string;
  shortDesc: string;
  desc: string;
  delYn: string;
  categCd: string;
  delImgInfos?: IImgDelInfos[];
  imgInfos?: IImgInfo[];
}

/** form 벨리데이션 체크 스키마 */
const validateSchema: Yup.SchemaOf<IForm> = Yup.object().shape({
  companyId: yupNumber.required('* 기업을 선택해 주세요.'),
  serviceName: Yup.string().required('* 서비스명을 입력해 주세요.'),
  shortDesc: Yup.string().required('* 서비스 소개를 입력해 주세요.'),
  desc: Yup.string().required('* 기업상세 내용을 입력해 주세요.'),
  delYn: Yup.string().required('* 서비스 노출여부를 선택해 주세요.'),
  categCd: Yup.string().required('* 카테고리를 선택해 주세요.'),
  delImgInfos: Yup.array().notRequired(),
  imgInfos: Yup.array().notRequired(),
});

/** component */
const Write: ForwardRefRenderFunction<IRef, IProps> = (
  { className, isModify, isFetching, detailData, opSubmit },
  ref,
) => {
  const detailDataResult = detailData?.RESULT;
  const data = detailData?.DATA;
  const detailDataMsg = detailData?.RESULT_MSG;
  const modifyImgInfos = data?.IMG_INFOS.map<IImgInfo>((img, idx) => ({
    idx,
    imgId: img.IMAGE_ID,
    isMain: img.MAIN_YN === 'Y',
    isMobileMain: img.MAIN_EVENT_YN === 'Y',
    imgPath: img.IMG_URL,
  }));

  // api call - 드랍다운 기업 리스트
  const { data: companyData, isFetching: isCompanyFetching } =
    useQueryApi<IResGetCompanySimpleList>(API_COMPANY.GET_SIMPLE_LIST);

  // api call - 카테고리 리스트
  const { data: categData, isFetching: isCategFetching } = useQueryApi<
    IResGetCodeList,
    IReqGetCodeList
  >([
    API_GET_CODE_LIST,
    {
      GROUP_ID: 'A0001',
    },
  ]);

  // default val
  const defaultVal = (): IForm => ({
    companyId: toDefault(data?.COMPANY_ID),
    serviceName: toDefault(data?.NAME),
    shortDesc: toDefault(data?.SHORT_DESC),
    desc: toDefault(data?.DESC),
    delYn: toDefault(data?.DEL_YN),
    categCd: toDefault(data?.CATEG_CD),
    delImgInfos: [],
    imgInfos: modifyImgInfos || [],
  });

  const {
    handleSubmit,
    watch,
    control,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(validateSchema),
    defaultValues: defaultVal(),
  });

  useEffect(() => {
    if (!isFetching && detailData) {
      reset(defaultVal());
    }
  }, [detailData, isFetching]);

  // ref
  useImperativeHandle(ref, () => ({
    submit: submit,
  }));

  // 이미지 메인 노출 Y/N 설정
  const handleYnToggle = (idx: number, field: 'isMain' | 'isMobileMain') => {
    const imgInfoConst = `imgInfos.${idx}` as const;
    const imgInfo = getValues(imgInfoConst);
    const isYn = !imgInfo?.[field];

    setValue(imgInfoConst, {
      ...imgInfo,
      [field]: isYn,
    });
  };

  // 파일 드레그&드랍
  const handleDrop = (idx: number, file: IFile) => {
    const imgInfoConst = `imgInfos.${idx}` as const;
    const imgInfo = getValues(imgInfoConst);

    setValue(imgInfoConst, {
      ...imgInfo,
      fileObj: file,
      isMain: false,
    });
  };

  // 파일 삭제시
  const handleRemoveFile = (idx: number) => {
    const imgInfoConst = `imgInfos.${idx}` as const;
    const imgInfo = getValues(imgInfoConst);
    const delImgs = getValues('delImgInfos') || [];
    const delId = imgInfo.imgId;

    // 만약 수정인데 기존 파일 삭제이면 삭제대상 목록에 삽입
    if (isModify && delId) {
      setValue('delImgInfos', [
        ...delImgs,
        {
          imgId: delId,
          imgUrl: imgInfo.imgPath,
        },
      ]);
    }

    setValue(imgInfoConst, {
      ...imgInfo,
      imgPath: undefined,
      fileObj: undefined,
      isMobileMain: false,
      isMain: false,
    });
  };

  // 파일 reject
  const handleReject = (errorCode?: string, fileRejections?: IFileRejection[]) => {
    console.log('file rejected', errorCode);
  };

  // submit
  const submit = handleSubmit(opSubmit);

  return (
    <Container className={className} onSubmit={submit}>
      <FormWrapper title='서비스 기본정보'>
        <FormWrapper contentsClassName='flex gap-6'>
          <Autocomplete
            control={control}
            isFetching={isCompanyFetching}
            name='companyId'
            label='* 기업 선택'
            focused
            placeholder='기업을 선택해 주세요.'
            options={companyData?.DATA || []}
            valueField='COMPANY_ID'
            getOptionLabel={(opt) => opt.NAME ?? ''}
            fullWidth
            {...setErrorProps(errors, 'companyId')}
          />
          <FormTextField
            control={control}
            name='serviceName'
            label='* 서비스명'
            placeholder='서비스명을 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'serviceName')}
          />
        </FormWrapper>
        <FormWrapper>
          <FormTextField
            control={control}
            name='shortDesc'
            label='* 서비스 간단소개 (30자 이내)'
            placeholder='서비스 소개를 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
            {...maxLengthProps(30)}
            {...setErrorProps(errors, 'shortDesc')}
          />
        </FormWrapper>
        <FormWrapper>
          <FormTextField
            control={control}
            name='desc'
            multiline
            rows={3}
            label='* 서비스 상세소개 (500자 이내)'
            placeholder='서비스 상세소개를 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
            {...maxLengthProps(500)}
            {...setErrorProps(errors, 'desc')}
          />
        </FormWrapper>
        <FormWrapper contentsClassName='flex gap-6'>
          <Autocomplete
            control={control}
            isFetching={isCategFetching}
            name='categCd'
            label='* 카테고리'
            focused
            placeholder='카테고리를 선택해 주세요.'
            options={categData?.DATA || []}
            valueField='CD'
            getOptionLabel={(opt) => opt.NAME ?? ''}
            fullWidth
            {...setErrorProps(errors, 'categCd')}
          />
          <Autocomplete
            control={control}
            name='delYn'
            label='* 서비스 노출 여부'
            focused
            placeholder='서비스 노출여부를 선택해 주세요.'
            valueField='VALUE'
            options={
              [
                { NAME: '예', VALUE: 'N' },
                { NAME: '아니오', VALUE: 'Y' },
              ] || []
            }
            getOptionLabel={(opt) => opt.NAME ?? ''}
            fullWidth
            {...setErrorProps(errors, 'delYn')}
          />
        </FormWrapper>
      </FormWrapper>
      <FormWrapper
        title='서비스 이미지'
        contentsClassName='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5'
      >
        {range(5).map((idx) => (
          <Controller
            key={idx}
            control={control}
            name={`imgInfos.${idx}`}
            render={({ field: { value } }) => (
              <FileCard
                isTwoBtnShow={true}
                firstBtnText='메인 노출'
                secondBtnText='대표 이미지'
                isFirstBtn={value?.isMobileMain}
                isSecondBtn={value?.isMain}
                previewUrl={value?.imgPath}
                opFirstBtnToggle={() => handleYnToggle(idx, 'isMobileMain')}
                opSecondBtnToggle={() => handleYnToggle(idx, 'isMain')}
                opDrop={(file) => handleDrop(idx, file)}
                opReject={handleReject}
                opRemoveFile={() => handleRemoveFile(idx)}
              />
            )}
          />
        ))}
      </FormWrapper>
    </Container>
  );
};

export default forwardRef(Write);
