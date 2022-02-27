import { IReqListBase, IResBase, IResListBase } from '~/types/apis/base';

/** GET REQ 서비스 리스트 */
export interface IReqGetServiceList extends IReqListBase {
  COMPANY_NAME?: string;
  SERVICE_NAME?: string;
}

/** DTO 기업 리스트 */
export interface IDtoServiceList {
  LIST_NUM: number;
  COMPANY_ID: number;
  SERVICE_ID: number;
  COMPANY_NAME: string;
  SHORT_DESC: string;
  IMG_URL: string;
}

/** GET RES 기업 리스트 */
export interface IResGetServiceList extends IResListBase {
  DATA: IDtoServiceList[];
}
