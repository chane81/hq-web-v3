/** 기본 res 타입 */
export interface IResBase {
  RESULT: boolean;
  RESULT_CODE: string;
  RESULT_MSG: string;
}

/** 기본 res 리스트 타입 */
export interface IResListBase extends IResBase {
  TOTAL_COUNT: number;
}

/** 기본 req 리스트 타입 */
export interface IReqListBase {
  PAGE_NO: number;
  PAGE_SIZE: number;
}
