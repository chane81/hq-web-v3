import { FC, useEffect, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AgGridColumn } from '@ag-grid-community/react';
import {
  GridApi,
  ColumnApi,
  GridReadyEvent,
  Column,
  ICellRendererParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import Paging, { IRefPaging } from '~/components/paging';
import { useQueryApi } from '~/hooks/useQueryApi';
import { PAGE_SIZE } from '~/constants/paging';
import { agCommonStyle } from '~/styles/agGrid';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { AgGridContainer } from '~/components/aggrid/AgGridContainer';
import { TypeSort } from '~/components/aggrid/AgSortHeader';
import { getSort } from '~/utils/agUtils';
import {
  IReqGetReviewList,
  IResGetReviewList,
} from '~/types/apis/review/get.reviewList';
import { API_REVIEW } from '~/constants/apis/review';
import { useStore } from '~/stores';

/** style */
const Container = styled.div`
  ${tw`relative h-full flex flex-col justify-center items-center`};

  ${agCommonStyle}
`;

/** props */
interface IProps {
  className?: string;
}

/** component: 리스트 */
const List: FC<IProps> = ({ className }) => {
  const { reviewModel } = useStore();
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const refPaging = useRef<IRefPaging>(null);
  const [page, setPage] = useState<number>(1);
  const [sortCol, setSortCol] = useState<string>('');
  const [sort, setSort] = useState<TypeSort>('');

  // api call
  const { data, isFetching } = useQueryApi<IResGetReviewList, IReqGetReviewList>([
    API_REVIEW.GET_LIST,
    {
      PAGE_NO: page,
      PAGE_SIZE: PAGE_SIZE,
      SORT_COL: sortCol,
      SORT: sort,
    },
  ]);

  useEffect(() => {
    if (!isFetching) {
      reviewModel.setTotalCount(data?.TOTAL_COUNT || 0);
    }
  }, [isFetching]);

  // ag-grid ready 이벤트
  const handleGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // 컬럼 소팅 클릭시
  const handleSort = (api: GridApi, column: Column, sort: TypeSort) => {
    const colId = column.getColId();

    // 소팅 대상 컬럼 상태 set
    setSortCol(() => colId);

    // 소팅 상태 set
    setSort(() => sort);
  };

  return (
    <Container className={className}>
      <AgGridContainer
        isFetching={isFetching}
        rowData={data?.DATA}
        onGridReady={handleGridReady}
      >
        <AgGridColumn field='LIST_NUM' headerName='NO' width={60} />
        <AgGridColumn field='NICK_NAME' headerName='닉네임' width={100} />
        <AgGridColumn field='EMAIL' headerName='이메일' minWidth={170} flex={1} />
        <AgGridColumn
          field='COMPANY_NAME'
          headerName='기업명'
          minWidth={170}
          flex={1}
          headerComponent='AgSortHeader'
          headerComponentParams={(params: ICellRendererParams) => ({
            params,
            enableMenu: false,
            enableSorting: true,
            sort: getSort(params, sortCol, sort),
            opSort: handleSort,
          })}
        />
        <AgGridColumn
          field='SERVICE_NAME'
          headerName='서비스명'
          minWidth={170}
          flex={1}
          headerComponent='AgSortHeader'
          headerComponentParams={(params: ICellRendererParams) => ({
            params,
            enableMenu: false,
            enableSorting: true,
            sort: getSort(params, sortCol, sort),
            opSort: handleSort,
          })}
        />
        <AgGridColumn
          field='REG_DT'
          headerName='작성일'
          editable={false}
          minWidth={110}
          flex={1}
          headerComponent='AgSortHeader'
          headerComponentParams={(params: ICellRendererParams) => ({
            params,
            enableMenu: false,
            enableSorting: true,
            sort: getSort(params, sortCol, sort),
            opSort: handleSort,
          })}
        />
        <AgGridColumn
          field='CONTENTS'
          headerName='리뷰 내용'
          minWidth={170}
          flex={1}
        />
        <AgGridColumn
          field='USED_GRADE'
          headerName='별점'
          width={80}
          headerComponent='AgSortHeader'
          headerComponentParams={(params: ICellRendererParams) => ({
            params,
            enableMenu: false,
            enableSorting: true,
            sort: getSort(params, sortCol, sort),
            opSort: handleSort,
          })}
        />
        <AgGridColumn
          field='IMG_YN'
          headerName='이미지 유무'
          minWidth={140}
          flex={1}
        />
      </AgGridContainer>

      {/* 페이징 */}
      <Paging
        className='mt-4'
        pageSize={PAGE_SIZE}
        totalCount={data?.TOTAL_COUNT || 0}
        ref={refPaging}
        opClick={async (pageNo) => setPage(pageNo)}
      />
      {/* 페이징 */}
    </Container>
  );
};

export { List };
