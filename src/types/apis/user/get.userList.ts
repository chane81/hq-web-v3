import { IReqListBase, IResListBase } from '~/types/apis/base';

/** GET REQ 유저 리스트 */
export interface IReqGetUserList extends IReqListBase {
  GUBUN_CD?: string;
  EMAIL?: string;
  PHONE_NO?: string;
  SORT_COL?: string;
  SORT?: string;
}

/** DTO 유저 리스트 */
export interface IDtoUserList {
  lIST_NUM: string;
  USER_ID: number;
  GUBUN_CD: string;
  GUBUN_CD_NAME: string;
  EMAIL: string;
  NICK_NAME: string;
  AGE_GROUP: number;
  PHONE_NO: string;
  ADDR1: string;
  ADDR2: string;
  MY_ADDR: string;
  SEX: string;
  SEX_CODE_NAME: string;
  REG_DT: string;
}

/** GET RES 유저 리스트 */
export interface IResGetUserList extends IResListBase {
  DATA: IDtoUserList[];
}
