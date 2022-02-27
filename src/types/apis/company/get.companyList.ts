import { IReqListBase, IResListBase } from '~/types/apis/base';

/** POST REQ 기업 리스트 */
export interface IReqGetCompanyList extends IReqListBase {
  SCH_TEXT?: string;
  CATEG_CD?: string;
  SORT_COL?: string;
  SORT?: string;
}

/** DTO 기업 리스트 */
export interface IDtoCompanyList {
  LIST_NUM: number;
  COMPANY_ID: number;
  NAME: string;
  SHORT_DESC: string;
  DESC: string;
  ADDR: string;
  OWNER: string;
  HASH_TAG: string;
  IMG_URL: string;
  TEL_NO: string;
  LAT: number;
  LON: number;
}

/** POST RES 기업 리스트 */
export interface IResGetCompanyList extends IResListBase {
  DATA: IDtoCompanyList[];
}
