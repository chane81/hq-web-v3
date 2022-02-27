import { ReactNode, FC, useState } from 'react';
import tw, { styled } from 'twin.macro';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from 'next/router';

/** style */
const Container = styled(MuiAppBar)`
  ${tw`shadow-none border-b border-gray-200`};
`;

/** props */
interface IProps {
  /** 메뉴 show 여부 */
  isMenuShow?: boolean;
  /** 검색버튼 show 여부 */
  isSearchShow?: boolean;
  /** 타이틀 */
  title?: string;
  /** 이동할 페이지 있을 시 url 넣어주면 아이콘과 같이 표시 */
  navUrl?: string;
  /** children */
  children?: ReactNode;
  /** 메뉴 토글 핸들러 */
  opMenuToggle?: () => void;
}

const AppBar: FC<IProps> = ({
  isMenuShow = true,
  isSearchShow = true,
  title,
  navUrl,
  children,
  opMenuToggle,
}) => {
  const [isSearch, setIsSearch] = useState(false);
  const router = useRouter();

  // 메뉴 토글
  const handleMenuToggle = () => {
    opMenuToggle?.();
  };

  // nav 버튼 클릭시 해당 url 로 이동
  const handleNav = () => {
    if (navUrl) {
      router.push(navUrl);
    }
  };

  // 검색영역 드로어 toggle
  const handleSearchToggle = () => {
    setIsSearch(!isSearch);
  };

  return (
    <Container position='fixed' className='w-full bg-gray-50 text-gray-800'>
      <Toolbar>
        {!navUrl && isMenuShow && (
          <IconButton
            color='inherit'
            className='pr-0'
            aria-label='open menu'
            edge='start'
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        )}

        {navUrl && (
          <IconButton
            color='inherit'
            className='pr-0'
            aria-label='nav'
            edge='start'
            onClick={handleNav}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        {title && (
          <Typography
            variant='h6'
            noWrap
            component='div'
            className='w-full text-center'
          >
            {title}
          </Typography>
        )}
        {children}
        {isSearchShow && (
          <IconButton
            color='inherit'
            aria-label='nav'
            onClick={handleSearchToggle}
          >
            <SearchOutlinedIcon />
          </IconButton>
        )}
      </Toolbar>
    </Container>
  );
};

export { AppBar };
