import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQueryApi } from './useQueryApi';
import { API_GET_LOGIN_CHECK } from '~/constants/apis/auth';
import { IResGetLoginCheck } from '~/types/apis/auth/get.loginCheck';

/** 자동 로그아웃 hooks */
export const useAutoLogout = (isLoginCheck: boolean) => {
  const router = useRouter();

  const { data, isFetching } = useQueryApi<IResGetLoginCheck>(
    API_GET_LOGIN_CHECK,
    {
      queryConfig: {
        enabled: isLoginCheck,
      },
    },
  );

  useEffect(() => {
    if (isLoginCheck && !isFetching && !data?.RESULT) {
      router.push('/auth/login');
    }
  }, [isLoginCheck, isFetching, data, router]);

  return { isFetching, isOk: data?.RESULT };
};
