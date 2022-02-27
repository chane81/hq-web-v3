import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';
import { LAST_API_TIME, TOKEN } from '~/constants/cookie';
import env from '~/env';

/** 기본 axios fetch 함수 */
const baseFetch =
  (baseURL?: string, errorCallback?: (ex: any) => void) =>
  async <Res = any, Req = any>(
    url: string,
    paramData?: Req | void,
    config?: AxiosRequestConfig,
  ) => {
    const cookies = new Cookies();
    const isGetMethod =
      !config || !config.method || config?.method?.toUpperCase() === 'GET';

    let resData;

    try {
      const { data } = await axios.request<Res>({
        // base url
        baseURL: baseURL || env.ADMIN_API_URL,

        // url
        url,

        // set method
        method: isGetMethod ? 'GET' : config?.method,

        // GET 방식이면 params 로 paramData 값 넘기고 그외에는 data 로 paramData 넘김
        ...(isGetMethod ? { params: paramData } : { data: paramData }),

        // credentials
        withCredentials: true,

        // axios config
        ...config,
      });

      resData = data;

      // 마지막 api 호출 시간을 쿠키로 저장
      // 마지막 호출 시간으로 부터 9시간이 지나면 자동 로그아웃을 위한 쿠키
      cookies.set(LAST_API_TIME, new Date());

      return data;
    } catch (ex: any) {
      console.error('[ERROR] fetcher api call', ex.message);

      // 에러발생시 콜백 - 윗단으로 throw error시 쓰일 수 있음
      errorCallback?.(ex);

      return ex.response?.data;
    }
  };

/** fetch admin api - command 용 */
const fetchAdminApi = baseFetch(env.ADMIN_API_URL);

export { baseFetch, fetchAdminApi };
