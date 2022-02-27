import { ChangeEvent, FC, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { FormTextField } from '~/components/form/FormTextField';
import { FormCheckbox } from '~/components/form/FormCheckbox';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutationApi } from '~/hooks/useQueryApi';
import { IReqPostSetLogin, IResPostSetLogin } from '~/types/apis/auth/post.login';
import { API_GET_LOGIN_CHECK, API_POST_LOGIN } from '~/constants/apis/auth';
import { LOGIN_EMAIL, TOKEN } from '~/constants/cookie';
import { BasicCard } from '~/components/card/BasicCard';
import { useQueryClient } from 'react-query';
import { setErrorProps } from '~/utils/muiUtils';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

/** style */
const Container = styled.div`
  .login-wrapper {
    ${tw`xs:border-none xs:!bg-gray-100 xs:!shadow-none sm:border-solid sm:bg-white sm:shadow-lg`}
  }
`;

/** form state type */
interface IForm {
  email: string | null;
  password: string | null;
  loginInfoChecked: boolean;
}

/** form 벨리데이션 체크 스키마 */
const validateSchema: Yup.SchemaOf<IForm> = Yup.object().shape({
  email: Yup.string()
    .email('이메일 형식이 틀렸습니다.')
    .required('이메일을 입력해 주세요.'),
  password: Yup.string().required('비밀번호를 입력해 주세요'),
  loginInfoChecked: Yup.boolean().default(false),
});

/** 로그인 */
const Login: FC = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const [isInvalidAuthState, setIsInvalidAuthState] = useState<boolean | null>(
    null,
  );
  const loginInfoCookie = cookies.get(LOGIN_EMAIL) || '';
  const queryClient = useQueryClient();

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
    defaultValues: {
      email: loginInfoCookie,
      password: '',
      loginInfoChecked: false,
    },
  });

  // 쿠키는 useForm 에서 defaultValues 로는 세팅이 되지 않는다.
  // useEffect와 setValue 사용으로 대체
  useEffect(() => {
    setValue('loginInfoChecked', !!loginInfoCookie);
  }, [loginInfoCookie]);

  // api call
  const { mutateAsync: loginMutate } = useMutationApi<
    IResPostSetLogin,
    IReqPostSetLogin
  >({
    axiosConfig: { method: 'POST' },
  });

  // 로그인 정보 저장 체크 해제시 쿠키 삭제
  const handleLoginInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    if (!checked) {
      cookies.remove(LOGIN_EMAIL);
    }

    setValue('loginInfoChecked', checked);
  };

  // submit
  const handleSubmitExec = async (values: IForm) => {
    // call api
    const data = await loginMutate({
      url: API_POST_LOGIN,
      body: {
        EMAIL: values.email || '',
        PWD: values.password || '',
      },
    });

    // 로그인 정상일 경우
    if (data?.RESULT) {
      queryClient.invalidateQueries(API_GET_LOGIN_CHECK);
      queryClient.clear();

      // 로그인 정보 저장 - 쿠키 저장
      if (values.loginInfoChecked) {
        cookies.set(LOGIN_EMAIL, values.email || '');
      }

      // 기업 정보로 이동
      router.push('/company');
    } else {
      // api 호출 후 로긍인 실패시 아래 상태값 true 로 update
      setIsInvalidAuthState(true);
    }
  };

  return (
    <Container className='w-full bg-gray-50 flex flex-col h-screen'>
      <main className='flex justify-center items-center flex-1'>
        <BasicCard
          className='border-none !shadow-none sm:border-solid bg-white sm:shadow-lg'
          titleClassName='p-4'
          title={
            <>
              <div className='font-medium text-xl'>여물봐 관리자 페이지</div>
              <div className='font-extralight text-xs mt-2'>
                고객의 정보를 안전하게 관리하기 위해 지정된 인원만 접근 가능합니다.
              </div>
            </>
          }
        >
          <form onSubmit={handleSubmit(handleSubmitExec)}>
            <FormTextField
              control={control}
              name='email'
              {...setErrorProps(errors, 'email')}
              label='이메일'
              variant='outlined'
              fullWidth
              className='mb-4'
              placeholder='이메일을 입력해주세요.'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormTextField
              control={control}
              name='password'
              {...setErrorProps(errors, 'password')}
              type='password'
              label='비밀번호'
              variant='outlined'
              fullWidth
              className='mb-1'
              placeholder='비밀번호를 입력해주세요.'
              color='primary'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            {isInvalidAuthState && (
              <FormHelperText error>
                * 이메일 또는 비밀번호가 틀렸습니다.
              </FormHelperText>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              size='large'
              className='mt-4 py-4 font-semibold text-lg'
            >
              Login
            </Button>
            <div className='mt-2'>
              <FormCheckbox
                control={control}
                name='loginInfoChecked'
                label='로그인 정보 저장'
                labelClassName='text-sm font-light select-none'
                onChange={handleLoginInfoChange}
              />
            </div>
          </form>
        </BasicCard>
      </main>
    </Container>
  );
};

export default Login;
