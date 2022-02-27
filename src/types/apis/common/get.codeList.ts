import { IResBase } from '~/types/apis/base';

/** GET REQ 공통코드 리스트 */
export interface IReqGetCodeList {
  CD?: string;
  GROUP_ID?: string;
}

/** DTO 공통코드 */
export interface IDtoCode {
  GROUP_ID: string;
  CD: string;
  NAME: string;
  ETC_1: string;
  ETC_2: string;
  ETC_3: string;
  ETC_4: string;
}

/** GET RES 기업 상세 */
export interface IResGetCodeList extends IResBase {
  DATA: IDtoCode[];
}
