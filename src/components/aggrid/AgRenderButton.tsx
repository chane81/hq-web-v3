import { ICellRendererParams } from '@ag-grid-community/core';
import { FC } from 'react';
import Button from '@mui/material/Button';

/** props */
export interface IProps extends ICellRendererParams {
  btnText?: string;
  btnClassName?: string;
  btnColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  btnSize?: 'small' | 'medium' | 'large';
  opClick?: (params: ICellRendererParams) => void;
}

/** component: ag-grid renderer 버튼 */
const AgRenderButton: FC<IProps> = ({
  btnText,
  btnClassName,
  btnColor = 'primary',
  btnSize = 'medium',
  opClick,
  ...props
}) => {
  // 버튼 클릭시
  const handleClick = () => {
    opClick?.(props);
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Button
        type='submit'
        variant='contained'
        color={btnColor}
        size={btnSize}
        className={`font-normal text-sm ${btnClassName}`}
        onClick={handleClick}
      >
        {btnText}
      </Button>
    </div>
  );
};

export { AgRenderButton };
