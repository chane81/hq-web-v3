import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Typography from '@mui/material/Typography';
import { FC, ReactNode } from 'react';

/** props */
interface IProps {
  /** app bar css class */
  className?: string;
  /** 타이틀 css class */
  titleClassName?: string;
  /** 타이틀 */
  title?: string;
  /** children */
  children?: ReactNode;
  /** nav 버튼 클릭 이벤트 핸들러 */
  opNavClick?: () => void;
}

/** component: nav app bar */
const NavAppBar: FC<IProps> = ({
  className,
  titleClassName,
  title,
  children,
  opNavClick,
}) => {
  return (
    <AppBar position='fixed' className={`bg-gray-50 shadow-none ${className}`}>
      <Toolbar className='flex border-b border-gray-200'>
        <IconButton
          color='inherit'
          className='pr-0'
          aria-label='nav'
          edge='start'
          onClick={opNavClick}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
          component='div'
          className='w-full text-center'
        >
          <span className={titleClassName}>{title}</span>
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export { NavAppBar };
