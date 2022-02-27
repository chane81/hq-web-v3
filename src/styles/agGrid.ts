import { css } from 'twin.macro';
import tw from 'twin.macro';

/** ag-grid 공통 스타일 */
export const agCommonStyle = css`
  .ag-header-cell-text {
    ${tw`h-auto`};
  }
  .ag-header-cell-label {
    ${tw`flex justify-center`};
  }

  .ag-cell {
    ${tw`h-full flex justify-center items-center`};
  }

  /* .ag-header-icon,
  .ag-header-cell-menu-button {
    ${tw`hidden`};
  } */

  .ag-react-container {
    ${tw`flex items-center w-full h-full`};
  }
`;