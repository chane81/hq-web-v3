import { IResBase } from '~/types/apis/base';

/** POST REQ 로그인 */
export interface IReqPostSetLogin {
  EMAIL: string;
  PWD: string;
}

/** DTO 로그인 후 사용자 정보 */
export interface IDtoUser {
  USER_ID: number;
  GUBUN_CD: string;
  EMAIL: string;
  NICK_NAME: string;
  AGE_GROUP: number;
  PHONE_NO: string;
  ADDR1: string;
  ADDR2: string;
  MY_ADDR: string;
  SEX: string;
  COUPON_COUNT: number;
  SERVICE_USE_COUNT: number;
}

/** POST RES 로그인 */
export interface IResPostSetLogin extends IResBase {
  DATA: IDtoUser;
}
