import {
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import { FormTextField } from '~/components/form/FormTextField';
import { styled } from 'twin.macro';
import { IFile, IFileRejection } from '~/components/file/FilePreviewDropzone';
import { FormWrapper } from '~/components/form/FormWrapper';
import { FileCard } from '~/views/common/FileCard';
import { useForm, Controller, SubmitHandler, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { yupNumber } from '~/utils/yupUtils';
import {
  IDtoCompanyDetail,
  IDtoCompanyDetailImg,
  IResGetCompanyDetail,
} from '~/types/apis/company/get.companyDetail';
import * as Yup from 'yup';
import { range } from 'lodash';
import { maxLengthProps, setErrorProps } from '~/utils/muiUtils';
import { toDefault } from '~/utils/commonUtils';

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
  detailData?: IResGetCompanyDetail;
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
  /** 메인 노출여부 */
  isMain?: boolean;
}

/** form */
export interface IForm {
  companyName: string;
  shortDesc: string;
  desc: string;
  telNo: string;
  addr: string;
  zipCode: string;
  owner: string;
  bussinessNo: string;
  hashTag: string;
  lat: number | '';
  lon: number | '';
  delImgInfos?: IImgDelInfos[];
  imgInfos?: IImgInfo[];
}

/** form 벨리데이션 체크 스키마 */
const validateSchema: Yup.SchemaOf<IForm> = Yup.object().shape({
  companyName: Yup.string().required('* 기업명을 입력해 주세요.'),
  shortDesc: Yup.string().required('* 기업간단 소개를 입력해 주세요'),
  desc: Yup.string().required('* 기업상세 내용을 입력해 주세요'),
  telNo: Yup.string().required('* 기업연락처를 입력해 주세요'),
  addr: Yup.string().required('* 기업주소를 입력해 주세요'),
  zipCode: Yup.string().required('* 우편번호를 입력해 주세요'),
  owner: Yup.string().required('* 대표자명을 입력해 주세요'),
  bussinessNo: Yup.string().required('* 사업자번호를 입력해 주세요'),
  hashTag: Yup.string().default(''),
  lat: yupNumber.required('* 기업 위도정보를 입력해 주세요.'),
  lon: yupNumber.required('* 기업 경도정보를 입력해 주세요.'),
  delImgInfos: Yup.array().notRequired(),
  imgInfos: Yup.array().notRequired(),
});

/** component */
const Write: ForwardRefRenderFunction<IRef, IProps> = (
  { className, isModify, detailData, opSubmit },
  ref,
) => {
  const detailDataResult = detailData?.RESULT;
  const data = detailData?.DATA;
  const detailDataMsg = detailData?.RESULT_MSG;
  const modifyImgInfos = data?.IMG_INFOS.map<IImgInfo>((img, idx) => ({
    idx,
    imgId: img.IMAGE_ID,
    isMain: img.MAIN_YN === 'Y',
    imgPath: img.IMG_URL,
  }));

  // default val
  const defaultVal = (): IForm => ({
    companyName: toDefault(data?.NAME),
    shortDesc: toDefault(data?.SHORT_DESC),
    desc: toDefault(data?.DESC),
    telNo: toDefault(data?.TEL_NO),
    addr: toDefault(data?.ADDR),
    zipCode: toDefault(data?.ZIP_CODE),
    owner: toDefault(data?.OWNER),
    bussinessNo: toDefault(data?.BUSINESS_NO),
    hashTag: toDefault(data?.HASH_TAG),
    lat: toDefault(data?.LAT),
    lon: toDefault(data?.LON),
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
    if (detailData) {
      reset(defaultVal());
    }
  }, [detailData]);

  // ref
  useImperativeHandle(ref, () => ({
    submit: submit,
  }));

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type),
  //   );
  //   // return () => subscription.unsubscribe();
  // }, [watch]);

  // 이미지 메인 노출 Y/N 설정
  const handleMainYnToggle = (idx: number) => {
    const imgInfoConst = `imgInfos.${idx}` as const;
    const imgInfo = getValues(imgInfoConst);
    const isMain = !imgInfo?.isMain;

    setValue(imgInfoConst, {
      ...imgInfo,
      isMain,
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
      <FormWrapper title='기업 기본정보'>
        <FormWrapper contentsClassName='flex gap-6'>
          <FormTextField
            control={control}
            name='companyName'
            label='* 기업명'
            placeholder='기업명을 입력해 주세요'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'companyName')}
          />
          <FormTextField
            control={control}
            name='telNo'
            label='* 기업연락처'
            placeholder='기업연락처를 입력해 주세요'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'telNo')}
          />
        </FormWrapper>
        <FormWrapper contentsClassName='flex gap-6'>
          <FormTextField
            control={control}
            name='addr'
            label='* 기업주소'
            placeholder='기업주소를 입력해 주세요'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'addr')}
          />
          <FormTextField
            control={control}
            name='zipCode'
            label='* 우편번호'
            type='number'
            placeholder='우편번호를 입력해 주세요'
            variant='outlined'
            {...maxLengthProps(5)}
            focused
            fullWidth
            {...setErrorProps(errors, 'zipCode')}
          />
        </FormWrapper>
        <FormWrapper contentsClassName='flex gap-6'>
          <FormTextField
            control={control}
            name='bussinessNo'
            label='* 사업자번호'
            type='number'
            placeholder='사업자번호를 입력해 주세요'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'bussinessNo')}
          />
          <FormTextField
            control={control}
            name='owner'
            label='* 대표자명'
            placeholder='대표자명을 입력해 주세요'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'owner')}
          />
        </FormWrapper>

        <FormWrapper title='기업 소개'>
          <FormWrapper>
            <FormTextField
              control={control}
              name='shortDesc'
              label='* 기업간단 소개 (30자 이내)'
              placeholder='기업 간단 소개를 입력해 주세요'
              variant='outlined'
              {...maxLengthProps(30)}
              focused
              fullWidth
              {...setErrorProps(errors, 'shortDesc')}
            />
          </FormWrapper>
          <FormWrapper>
            <FormTextField
              control={control}
              name='desc'
              multiline
              rows={3}
              label='* 기업상세소개 (500자 이내)'
              placeholder='기업상세 내용을 입력해 주세요'
              variant='outlined'
              {...maxLengthProps(500)}
              focused
              fullWidth
              {...setErrorProps(errors, 'desc')}
            />
          </FormWrapper>
        </FormWrapper>
      </FormWrapper>

      <FormWrapper title='기업 좌표'>
        <FormWrapper contentsClassName='flex gap-6'>
          <FormTextField
            control={control}
            name='lat'
            label='* 위도'
            type='number'
            placeholder='기업 위도정보를 입력해 주세요'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'lat')}
          />
          <FormTextField
            control={control}
            name='lon'
            label='* 경도'
            type='number'
            placeholder='기업 경도 정보를 입력해 주세요'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'lon')}
          />
        </FormWrapper>
      </FormWrapper>

      <FormWrapper
        title='기업 이미지'
        contentsClassName='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5'
      >
        {range(5).map((idx) => (
          <Controller
            key={idx}
            control={control}
            name={`imgInfos.${idx}`}
            render={({ field: { value } }) => (
              <FileCard
                isFirstBtn={value?.isMain}
                firstBtnText='대표 이미지'
                previewUrl={value?.imgPath}
                opFirstBtnToggle={() => handleMainYnToggle(idx)}
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
