import { Column, ICellRendererParams } from '@ag-grid-community/core';
import { TypeSort } from '~/components/aggrid/AgSortHeader';

/** 소팅 관련 */

/**
 * 소팅 컴포넌트의 sort 파라메터에 전달시 사용할 함수
 * ex: sort: getSort(params, sortCol, sort)
 * @param params ICellRendererParams
 * @param sortColState 소팅 대상 컬럼 ID 상태값
 * @param sortState  소팅 상태값: ASC/DESC
 * @returns sortState
 */
export const getSort = (
  params: ICellRendererParams,
  sortColState: string,
  sortState: TypeSort,
) => (sortColState === params.column?.getId() ? sortState : '');
/** 소팅 관련 */
