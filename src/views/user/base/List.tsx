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
import { IReqGetUserList, IResGetUserList } from '~/types/apis/user/get.userList';
import { API_USER } from '~/constants/apis/user';
import { TypeSort } from '~/components/aggrid/AgSortHeader';
import { getSort } from '~/utils/agUtils';
import { useStore } from '~/stores';
import { observer } from 'mobx-react-lite';

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
  const { userModel } = useStore();
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const refPaging = useRef<IRefPaging>(null);
  const [page, setPage] = useState<number>(1);
  const [sortCol, setSortCol] = useState<string>('');
  const [sort, setSort] = useState<TypeSort>('');

  // api call
  const { data, isFetching } = useQueryApi<IResGetUserList, IReqGetUserList>([
    API_USER.GET_LIST,
    {
      PAGE_NO: page,
      PAGE_SIZE: PAGE_SIZE,
      SORT_COL: sortCol,
      SORT: sort,
    },
  ]);

  useEffect(() => {
    if (!isFetching) {
      userModel.setTotalCount(data?.TOTAL_COUNT || 0);
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
        <AgGridColumn
          field='EMAIL'
          headerName='이메일'
          cellClass='ag-text'
          minWidth={170}
          flex={1}
        />
        <AgGridColumn
          field='REG_DT'
          headerName='가입일'
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
          field='PHONE_NO'
          headerName='연락처'
          minWidth={120}
          flex={1}
        />
        <AgGridColumn
          field='SEX'
          headerName='성별'
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
          field='AGE_GROUP'
          headerName='연령대'
          width={100}
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
          field='MY_ADDR'
          headerName='위치'
          minWidth={160}
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
        totalCount={data?.TOTAL_COUNT || 0}
        ref={refPaging}
        opClick={async (pageNo) => setPage(pageNo)}
      />
      {/* 페이징 */}
    </Container>
  );
};

export default observer(List);
