import { FC } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/** props */
interface IProps {
  className?: string;
  isFullWidth?: boolean;
  titleClassName?: string;
  title?: string;
  opClick?: () => void;
}

/** 드랍다운 버튼 */
const DropdownButton: FC<IProps> = ({
  className,
  isFullWidth = true,
  titleClassName,
  title,
  opClick,
}) => {
  return (
    <Button
      variant='outlined'
      className={`text-gray-600 flex justify-between ${className}`}
      endIcon={<KeyboardArrowDownIcon />}
      fullWidth={isFullWidth}
      onClick={opClick}
    >
      <span className={`font-normal ${titleClassName}`}>{title}</span>
    </Button>
  );
};

export { DropdownButton };
