import { AxiosRequestConfig } from 'axios';
import {
  useQueryClient,
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
} from 'react-query';
import { useRef } from 'react';
import { baseFetch } from '~/utils/queryFetcher';
import env from '~/env';
import { useRouter } from 'next/router';

export type TQueryConfig<Res = any, Req = any> =
  | Omit<
      UseQueryOptions<Res | undefined, Error, Res, string | TQueryKey<Req>>,
      'queryKey' | 'queryFn'
    >
  | undefined;
export type TMutationConfig<Res = any, Req = any> =
  | Omit<UseMutationOptions<Res, Error, IMutateParams<Req>, unknown>, 'mutationFn'>
  | undefined;

/**
 * hooks config
 * axiosConfig: axios config
 * queryConfig: react query config
 */
export interface IConfig<T> {
  axiosConfig?: AxiosRequestConfig;
  queryConfig?: T;
}

/** react query key type */
export type TQueryKey<T> = (string | T)[];

/** select 성격(Method: GET) base api hooks */
const useBaseQueryApi = <Res, Req = undefined>(
  key: TQueryKey<Req> | string,
  config?: IConfig<TQueryConfig<Res, Req>>,
  baseURL?: string,
) => {
  const router = useRouter();
  // [url, parameters] 형태로 넘어왔는지 여부
  const isKeyArray = Array.isArray(key) && key.length > 1;

  // error 처리
  const error = useRef(undefined);
  const isError = useRef(false);
  const data = useRef(undefined);

  // fetcher
  const apiFetcher = baseFetch(baseURL, (ex: any) => {
    error.current = ex;
    isError.current = true;
    data.current = ex.response?.data;

    // throw new Error(ex);
  });

  // url, params
  const url = (isKeyArray ? key[0] : key) as string;
  const params = (isKeyArray ? key[1] : undefined) as Req;

  // react-query 실행
  const result = useQuery(
    key,
    async () => {
      return apiFetcher<Res, Req>(url, params, config?.axiosConfig);
    },
    config?.queryConfig,
  ) as UseQueryResult<Res, Error>;

  // 로그인 만료, unauthorize 이면 로그인으로 이동
  if (isError.current && [401, 403].includes((data.current as any)?.statusCode)) {
    router.push('/auth/login');
  }

  return {
    ...result,
    data: isError.current ? data.current : result.data,
    error: error.current,
    isError: isError.current,
  };
};

/** mutation 파라메터 타입 */
interface IMutateParams<T> {
  url: string;
  body?: T | undefined;
}

/** command 성격(Method: POST, PUT, DELETE, PATCH) */
const useBaseMutation = <Res, Req = void>(
  config?: IConfig<TMutationConfig<Res, Req>>,
  baseURL?: string,
) => {
  const router = useRouter();
  // error 처리
  const error = useRef(undefined);
  const isError = useRef(false);
  const data = useRef(undefined);

  // fetcher
  const apiFetcher = baseFetch(baseURL, (ex: any) => {
    error.current = ex;
    isError.current = true;
    data.current = ex.response?.data;

    //throw new Error(ex);
  });

  const result = useMutation<Res | undefined, Error, IMutateParams<Req>, unknown>(
    async (params: IMutateParams<Req>) =>
      apiFetcher<Res, Req>(params.url, params.body, config?.axiosConfig),
  );

  // 로그인 만료, unauthorize 이면 로그인으로 이동
  if (isError.current && [401, 403].includes((data.current as any)?.statusCode)) {
    router.push('/auth/login');
  }

  return {
    ...result,
    error: error.current,
    isError: isError.current,
  };
};

type TUrlGubun =
  | 'ADMIN_API_URL'
  | 'V7_API_URL'
  | 'V7_COMMON_URL'
  | 'V6_LAMBDA_URL';

/**
 * mutation - command 성 api 호출시 사용
 * @param config react-query mutation config 설정
 * @param gubun url 구분
 */
const useMutationApi = <Res, Req = void>(
  config?: IConfig<TMutationConfig<Res, Req>>,
  gubun: TUrlGubun = 'ADMIN_API_URL',
) => useBaseMutation<Res, Req>(config, env[gubun]);

/**
 * query - select 성 api 호출시 사용
 * @param key react-query key
 * @param config react-query query config 설정
 * @param gubun url 구분
 */
const useQueryApi = <Res, Req = void>(
  key: TQueryKey<Req> | string,
  config?: IConfig<TQueryConfig<Res, Req>>,
  gubun: TUrlGubun = 'ADMIN_API_URL',
) => useBaseQueryApi<Res, Req>(key, config, env[gubun]);

export {
  useQueryClient,
  useBaseQueryApi,
  useBaseMutation,
  useMutationApi,
  useQueryApi,
};
