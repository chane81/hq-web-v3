import { ICellRendererParams } from '@ag-grid-community/core';
import { FC } from 'react';

/** component: ag-grid renderer 이미지 */
const AgRenderImg: FC<ICellRendererParams> = (props) => {
  const cellValue = props.value;

  return (
    <div className='w-full'>
      {cellValue && (
        <img
          className='w-full object-cover h-24'
          //src='https://wolftracker9eee.blob.core.windows.net/wolfpictures-mock/big-wolf1.png'
          src={cellValue}
          alt='기업 이미지'
        />
      )}
    </div>
  );
};

export { AgRenderImg };
