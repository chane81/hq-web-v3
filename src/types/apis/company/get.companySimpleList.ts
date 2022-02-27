import { IResListBase } from '~/types/apis/base';

/** DTO 기업 간단 리스트 */
export interface IDtoCompanySimpleList {
  COMPANY_ID: number;
  NAME: string;
}

/** GET RES 기업 간단 리스트 */
export interface IResGetCompanySimpleList extends IResListBase {
  DATA: IDtoCompanySimpleList[];
}
