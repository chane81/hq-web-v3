import { IReqListBase, IResBase, IResListBase } from '~/types/apis/base';

/** GET REQ 공지 리스트 */
export interface IReqGetNotiList extends IReqListBase {
  SORT_COL?: string;
  SORT?: string;
}

/** DTO 공지 리스트 */
export interface IDtoNotiList {
  LIST_NUM: number;
  BOARD_ID: number;
  TITLE: string;
  SHORT_DESC: string;
  USE_YN: string;
  REG_DT: string;
  MOD_DT: string;
}

/** GET RES 공지 리스트 */
export interface IResGetNotiList extends IResListBase {
  DATA: IDtoNotiList[];
}
