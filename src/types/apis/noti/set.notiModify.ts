import { IResBase } from '~/types/apis/base';

/** POST REQ 공지 수정 */
export interface IReqPostNotiModify {
  BOARD_ID: number;
  TITLE: string;
  SHORT_DESC: string;
  CONTENTS: string;
  URL_1: string | undefined;
  URL_2: string | undefined;
  URL_3: string | undefined;
  USE_YN: string;
}

/** POST RES 공지 수정 */
export interface IResPostNotiModify extends IResBase {}
