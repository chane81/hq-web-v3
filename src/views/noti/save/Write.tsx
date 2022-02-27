import {
  useEffect,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'twin.macro';
import { FormWrapper } from '~/components/form/FormWrapper';
import { FormTextField } from '~/components/form/FormTextField';
import { Autocomplete } from '~/components/select/Autocomplete';
import { toDefault } from '~/utils/commonUtils';
import { maxLengthProps, setErrorProps } from '~/utils/muiUtils';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { IResGetNotiDetail } from '~/types/apis/noti/get.notiDetail';

/** style */
const Container = styled.form(``);

/** ref */
export interface IRef {
  submit: () => void;
}

/** props */
interface IProps {
  className?: string;
  isFetching?: boolean;
  detailData?: IResGetNotiDetail;
  opSubmit: (data: IForm) => void;
}

/** form */
export interface IForm {
  title: string;
  shortDesc: string;
  contents: string;
  useYn: 'Y' | 'N';
  url1?: string;
  url2?: string;
  url3?: string;
}

/** form 벨리데이션 체크 스키마 */
const validateSchema: Yup.SchemaOf<IForm> = Yup.object().shape({
  title: Yup.string().required('* 제목을 입력해 주세요.'),
  shortDesc: Yup.string().required('* 간단내용을 입력해 주세요.'),
  contents: Yup.string().required('* 내용을 입력해 주세요.'),
  useYn: Yup.mixed().oneOf(['Y', 'N']).required('* 노출여부를 선택해 주세요.'),
  url1: Yup.string().notRequired(),
  url2: Yup.string().notRequired(),
  url3: Yup.string().notRequired(),
});

/** component */
const Write: ForwardRefRenderFunction<IRef, IProps> = (
  { className, isFetching, detailData, opSubmit },
  ref,
) => {
  const detailDataResult = detailData?.RESULT;
  const data = detailData?.DATA;
  const detailDataMsg = detailData?.RESULT_MSG;

  // default val
  const defaultVal = (): IForm => ({
    title: toDefault(data?.TITLE),
    shortDesc: toDefault(data?.SHORT_DESC),
    contents: toDefault(data?.CONTENTS),
    useYn: toDefault(data?.USE_YN, 'Y'),
    url1: toDefault(data?.URL_1),
    url2: toDefault(data?.URL_2),
    url3: toDefault(data?.URL_3),
  });

  const {
    handleSubmit,
    control,
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

  // submit
  const submit = handleSubmit(opSubmit);

  return (
    <Container className={className} onSubmit={submit}>
      <FormWrapper title='공지 기본정보'>
        <FormWrapper contentsClassName='flex gap-6'>
          <FormTextField
            control={control}
            name='title'
            label='* 제목'
            placeholder='제목을 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
            {...setErrorProps(errors, 'title')}
          />
        </FormWrapper>
        <FormWrapper>
          <FormTextField
            control={control}
            name='shortDesc'
            label='* 간단내용 (30자 이내)'
            placeholder='간단내용을 입력해 주세요.'
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
            name='contents'
            multiline
            rows={3}
            label='* 내용 (500자 이내)'
            placeholder='내용을 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
            {...maxLengthProps(500)}
            {...setErrorProps(errors, 'contents')}
          />
        </FormWrapper>
        <FormWrapper contentsClassName='flex gap-6'>
          <Autocomplete
            control={control}
            name='useYn'
            label='* 노출 여부'
            focused
            placeholder='노출여부를 선택해 주세요.'
            valueField='VALUE'
            options={
              [
                { NAME: '예', VALUE: 'Y' },
                { NAME: '아니오', VALUE: 'N' },
              ] || []
            }
            getOptionLabel={(opt) => opt.NAME ?? ''}
            fullWidth
            {...setErrorProps(errors, 'useYn')}
          />
        </FormWrapper>
      </FormWrapper>
      <FormWrapper title='참고링크'>
        <FormWrapper>
          <FormTextField
            control={control}
            name='url1'
            label='참고링크 1'
            placeholder='참고링크를 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
          />
        </FormWrapper>
        <FormWrapper>
          <FormTextField
            control={control}
            name='url2'
            label='참고링크 2'
            placeholder='참고링크를 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
          />
        </FormWrapper>
        <FormWrapper>
          <FormTextField
            control={control}
            name='url3'
            label='참고링크 3'
            placeholder='참고링크를 입력해 주세요.'
            variant='outlined'
            focused
            fullWidth
          />
        </FormWrapper>
      </FormWrapper>
    </Container>
  );
};

export default forwardRef(Write);
