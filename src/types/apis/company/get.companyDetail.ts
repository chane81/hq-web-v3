import { IResBase } from '~/types/apis/base';

/** POST REQ 기업 상세 */
export interface IReqGetCompanyDetail {
  COMPANY_ID: number;
}

/** DTO 기업 상세 이미지 */
export interface IDtoCompanyDetailImg {
  IMAGE_ID: number;
  IMG_URL: string;
  MAIN_YN: 'Y' | 'N';
}

/** DTO 기업 상세 */
export interface IDtoCompanyDetail {
  NAME: string;
  TEL_NO: string;
  ADDR: string;
  ZIP_CODE: string;
  BUSINESS_NO: string;
  OWNER: string;
  HASH_TAG: string;
  SHORT_DESC: string;
  DESC: string;
  LON: number;
  LAT: number;
  IMG_INFOS: IDtoCompanyDetailImg[];
}

/** GET RES 기업 상세 */
export interface IResGetCompanyDetail extends IResBase {
  DATA: IDtoCompanyDetail;
}
