import { IReqListBase, IResListBase } from '~/types/apis/base';

/** GET REQ 리뷰 리스트 */
export interface IReqGetReviewList extends IReqListBase {
  SORT_COL?: string;
  SORT?: string;
}

/** DTO 리뷰 리스트 */
export interface IDtoReviewList {
  lIST_NUM: string;
  REVIEW_ID: number;
  NICK_NAME: string;
  EMAIL: string;
  COMPANY_ID: string;
  COMPANY_NAME: string;
  SERVICE_ID: number;
  SERVICE_NAME: string;
  REG_DT: string;
  CONTENTS: string;
  USED_GRADE: string;
  IMG_YN: string;
}

/** GET RES 리뷰 리스트 */
export interface IResGetReviewList extends IResListBase {
  DATA: IDtoReviewList[];
}
