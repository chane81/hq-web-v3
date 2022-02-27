import { FC } from 'react';
import { styled } from 'twin.macro';

/** style */
const AgLoadingWrapper = styled('div')`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

/** Component: ag-grid 용 로딩 기본 컴포넌트 */
const AgLoadingBase: FC = (props) => {
  return (
    <AgLoadingWrapper {...props}>
      <i className='fas fa-spinner fa-spin fa-2x' />
    </AgLoadingWrapper>
  );
};

export { AgLoadingBase };
