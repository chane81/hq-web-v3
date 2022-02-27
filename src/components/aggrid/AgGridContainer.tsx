import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { FC } from 'react';
import { AgRenderImg } from '~/components/aggrid/AgRenderImg';
import { AgRendererText } from '~/components/aggrid/AgRendererText';
import { AgLoadingLinear } from './AgLoadingLinear';
import { AgRenderButton } from '~/components/aggrid/AgRenderButton';
import { AgSortHeader } from '~/components/aggrid/AgSortHeader';

/** props */
interface IProps extends AgGridReactProps {
  isFetching?: boolean;
}

/** component: ag-grid container */
const AgGridContainer: FC<IProps> = ({
  isFetching = false,
  children,
  ...props
}) => {
  return (
    <>
      {/* 로딩 스피너 */}
      <AgLoadingLinear className={`w-full ${isFetching ? 'block' : 'hidden'}`} />
      {/* 로딩 스피너 */}
      <div className='flex-1 w-full ag-theme-alpine'>
        <AgGridReact
          {...props}
          modules={AllCommunityModules}
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            sortable: false,
            resizable: true,
            filter: true,
            suppressMenu: true,
            cellRenderer: AgRendererText,
          }}
          frameworkComponents={{
            AgRenderImg,
            AgRenderButton,
            AgSortHeader,
          }}
          suppressLoadingOverlay={true}
          suppressMenuHide={false}
          suppressColumnVirtualisation={true}
          debounceVerticalScrollbar={true}
          rowBuffer={20}
        >
          {children}
        </AgGridReact>
      </div>
    </>
  );
};

export { AgGridContainer };
