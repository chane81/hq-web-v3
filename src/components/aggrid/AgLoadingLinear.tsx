import React from 'react';
import { styled } from 'twin.macro';
import LinearProgress from '@mui/material/LinearProgress';

/** Props */
interface IProps {
  className?: string;
  top?: string;
  height?: string;
  width?: string;
}

/** style */
const AgLoadingWrapper = styled('div')<IProps>`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

/** Component: ag-grid 용 로딩 컴포넌트 Linear 타입 */
const AgLoadingLinear: React.FC<IProps> = (props) => {
  return (
    <AgLoadingWrapper {...props}>
      <LinearProgress className='w-full z-50' />
    </AgLoadingWrapper>
  );
};

export { AgLoadingLinear };
