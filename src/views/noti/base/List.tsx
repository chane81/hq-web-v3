import { FC, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AgGridColumn } from '@ag-grid-community/react';
import {
  GridApi,
  ColumnApi,
  GridReadyEvent,
  ICellRendererParams,
  Column,
} from '@ag-grid-community/core';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import Paging, { IRefPaging } from '~/components/paging';
import { useQueryApi } from '~/hooks/useQueryApi';
import { IProps as IAgRenderButton } from '~/components/aggrid/AgRenderButton';
import { PAGE_SIZE } from '~/constants/paging';
import { agCommonStyle } from '~/styles/agGrid';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { AgGridContainer } from '~/components/aggrid/AgGridContainer';
import { useRouter } from 'next/router';
import { defaultTo } from 'lodash';
import { IReqGetNotiList, IResGetNotiList } from '~/types/apis/noti/get.notiList';
import { API_NOTI } from '~/constants/apis/noti';
import { TypeSort } from '~/components/aggrid/AgSortHeader';
import { getSort } from '~/utils/agUtils';

/** style */
const Container = styled.div`
  ${tw`relative h-full flex flex-col justify-center items-center`};

  ${agCommonStyle}
`;

/** props */
interface IProps {
  className?: string;
  pageNo?: number;
}

/** component: 리스트 */
const List: FC<IProps> = ({ className, pageNo }) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const refPaging = useRef<IRefPaging>(null);
  const [page, setPage] = useState<number>(defaultTo(pageNo, 1));
  const [sortCol, setSortCol] = useState<string>('');
  const [sort, setSort] = useState<TypeSort>('');
  const router = useRouter();

  // api call
  const { data, isFetching } = useQueryApi<IResGetNotiList, IReqGetNotiList>([
    API_NOTI.GET_LIST,
    {
      PAGE_NO: page,
      PAGE_SIZE: PAGE_SIZE,
      SORT_COL: sortCol,
      SORT: sort,
    },
  ]);

  // ag-grid ready 이벤트
  const handleGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // 수정하기
  const handleModify = (params: ICellRendererParams) => {
    const notiId = params.data.BOARD_ID;

    router.push(`/noti/save?id=${notiId}&pageNo=${page}`);
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
        <AgGridColumn
          field='modify'
          headerName='수정'
          width={90}
          cellRenderer='AgRenderButton'
          cellRendererParams={(params): IAgRenderButton => ({
            btnText: '수정하기',
            btnSize: 'small',
            btnClassName: 'bg-rose-500 hover:bg-rose-600',
            opClick: handleModify,
            ...params,
          })}
        />
        <AgGridColumn field='TITLE' headerName='제목' width={220} />
        <AgGridColumn field='SHORT_DESC' headerName='간단내용' width={220} />
        <AgGridColumn
          field='USE_YN'
          headerName='노출유무'
          width={150}
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
          field='MOD_DT'
          headerName='수정일'
          width={150}
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
          headerName='등록일'
          minWidth={150}
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
      </AgGridContainer>

      {/* 페이징 */}
      <Paging
        className='mt-4'
        pageSize={PAGE_SIZE}
        defaultPageNo={pageNo}
        totalCount={data?.TOTAL_COUNT || 0}
        ref={refPaging}
        opClick={async (pageNo) => setPage(pageNo)}
      />
      {/* 페이징 */}
    </Container>
  );
};

export { List };
