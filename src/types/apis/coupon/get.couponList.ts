import { IReqListBase, IResListBase } from '~/types/apis/base';

/** GET REQ 쿠폰 리스트 */
export interface IReqGetCouponList extends IReqListBase {
  SORT_COL?: string;
  SORT?: string;
}

/** DTO 쿠폰 리스트 */
export interface IDtoCouponList {
  lIST_NUM: string;
  NICK_NAME: string;
  EMAIL: string;
  COMPANY_ID: string;
  COMPANY_NAME: string;
  SERVICE_ID: number;
  SERVICE_NAME: string;
  SERVICE_USE_DT: string;
  COUPON_NAME: string;
  REVIEW_YN: 'Y' | 'N';
}

/** GET RES 쿠폰 리스트 */
export interface IResGetCouponList extends IResListBase {
  DATA: IDtoCouponList[];
}
