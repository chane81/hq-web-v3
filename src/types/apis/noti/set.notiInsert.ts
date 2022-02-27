import { IResBase } from '~/types/apis/base';

/** POST REQ 공지 등록 */
export interface IReqPostNotiInsert {
  TITLE: string;
  SHORT_DESC: string;
  CONTENTS: string;
  URL_1: string | undefined;
  URL_2: string | undefined;
  URL_3: string | undefined;
  USE_YN: string;
}

/** POST RES 공지 등록 */
export interface IResPostNotiInsert extends IResBase {}
