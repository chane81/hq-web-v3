import { IResBase } from '~/types/apis/base';

/** GET REQ 서비스 상세 */
export interface IReqGetServiceDetail {
  SERVICE_ID: number;
}

/** DTO 서비스 상세 이미지 */
export interface IDtoServiceDetailImg {
  IMAGE_ID: number;
  IMG_URL: string;
  MAIN_YN: 'Y' | 'N';
  MAIN_EVENT_YN: 'Y' | 'N';
}

/** DTO 서비스 상세 */
export interface IDtoServiceDetail {
  COMPANY_ID: string;
  NAME: string;
  SHORT_DESC: string;
  DESC: string;
  DEL_YN: 'Y' | 'N';
  CATEG_CD: string;
  CATEG_NAME: string;
  IMG_INFOS: IDtoServiceDetailImg[];
}

/** GET RES 서비스 상세 */
export interface IResGetServiceDetail extends IResBase {
  DATA: IDtoServiceDetail;
}
