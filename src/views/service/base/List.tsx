import { FC, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AgGridColumn } from '@ag-grid-community/react';
import {
  GridApi,
  ColumnApi,
  GridReadyEvent,
  ICellRendererParams,
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
import {
  IReqGetServiceList,
  IResGetServiceList,
} from '~/types/apis/service/get.serviceList';
import { API_SERVICE } from '~/constants/apis/service';
import { AgGridContainer } from '~/components/aggrid/AgGridContainer';
import { useRouter } from 'next/router';
import { defaultTo } from 'lodash';

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
  const router = useRouter();

  // api call
  const { data, isFetching } = useQueryApi<IResGetServiceList, IReqGetServiceList>(
    [
      API_SERVICE.GET_LIST,
      {
        PAGE_NO: page,
        PAGE_SIZE: PAGE_SIZE,
      },
    ],
  );

  // ag-grid ready 이벤트
  const handleGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // 수정하기
  const handleModify = (params: ICellRendererParams) => {
    const serviceId = params.data.SERVICE_ID;

    router.push(`/service/save?id=${serviceId}&pageNo=${page}`);
  };

  return (
    <Container className={className}>
      <AgGridContainer
        isFetching={isFetching}
        rowData={data?.DATA}
        getRowHeight={() => 90}
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
        <AgGridColumn
          field='IMG_URL'
          headerName='서비스 이미지'
          width={220}
          cellRenderer='AgRenderImg'
        />
        <AgGridColumn field='COMPANY_NAME' headerName='기업명' width={150} />
        <AgGridColumn field='SERVICE_NAME' headerName='서비스명' width={150} />
        <AgGridColumn
          field='SHORT_DESC'
          headerName='서비스간단소개'
          minWidth={160}
          flex={1}
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
