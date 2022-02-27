import { IResBase } from '~/types/apis/base';

/** GET REQ 공지 상세 */
export interface IReqGetNotiDetail {
  BOARD_ID: number;
}

/** DTO 공지 상세 */
export interface IDtoNotiDetail {
  TITLE: string;
  SHORT_DESC: string;
  CONTENTS: string;
  USE_YN: 'Y' | 'N';
  URL_1: string;
  URL_2: string;
  URL_3: string;
}

/** GET RES 서비스 상세 */
export interface IResGetNotiDetail extends IResBase {
  DATA: IDtoNotiDetail;
}
