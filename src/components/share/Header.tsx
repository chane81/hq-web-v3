import { FC, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Cookies from 'universal-cookie';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { LAST_API_TIME, TOKEN } from '~/constants/cookie';
import { MENUS } from '~/constants/menu';
import { IResPostSetLogout } from '~/types/apis/auth/post.logout';
import { useMutationApi } from '~/hooks/useQueryApi';
import { API_POST_LOGOUT } from '~/constants/apis/auth';

/** style */
const Container = styled.div`
  z-index: 999;
  height: 60px;
  min-height: 60px;

  .img-logo {
    width: 100px;
    height: 46px;
    background-image: url('/images/headerLogo.svg');
  }

  .MuiTabs-flexContainer {
    height: 100%;

    button: {
      height: 100%;
    }
  }

  .tab {
    ${tw`font-semibold xs:text-sm xs:px-2 xs:min-w-16 md:min-w-24 md:px-4 md:text-lg h-full`};
  }

  .MuiChip-label {
    ${tw`xs:text-tiny md:text-sm`};
  }

  ${tw`flex items-center bg-white w-screen`}
`;

/** props */
export interface IProps {
  isMenuShow?: boolean;
  isLogoutShow?: boolean;
}

/** component: 헤더 */
const Header: FC<IProps> = ({ isMenuShow = true, isLogoutShow = true }) => {
  const cookies = new Cookies();
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(MENUS[0].url);

  // api call
  const { mutateAsync: logoutMutate } = useMutationApi<IResPostSetLogout>({
    axiosConfig: { method: 'POST' },
  });

  // 로그아웃 클릭시
  const handleLogout = async () => {
    cookies.remove(LAST_API_TIME);

    // api call
    const data = await logoutMutate({
      url: API_POST_LOGOUT,
    });

    // 로그아웃 성공이면
    if (data?.RESULT) {
      // 로그인으로 강제 이동
      router.push('/auth/login');
    }
  };

  // 접속한 url 에 따른 메뉴 활성화 세팅
  useEffect(() => {
    const selectedMenu = MENUS.filter((menu) =>
      router.pathname.includes(menu.url),
    );

    if (selectedMenu && selectedMenu.length > 0) {
      setSelectedMenu(selectedMenu[0].url);
    }
  }, [router.pathname]);

  // menu click
  const handleMenuClick = (event: React.SyntheticEvent, path: string) => {
    setSelectedMenu(path);

    router.push(path);
  };

  // menu 마우스 오버시 page prefetch
  const handleMouseOver = (url: string) => {
    router.prefetch(url);
  };

  return (
    <Container className='flex justify-between fixed w-full bg-gray-50 text-gray-800'>
      <div className='hidden sm:block ml-4 text-red-500 font-bold text-lg'>
        Admin
      </div>
      {isMenuShow && (
        <Box className='h-full ml-2'>
          <Tabs
            value={selectedMenu}
            onChange={handleMenuClick}
            aria-label='basic tabs example text-lg'
          >
            {MENUS.map((val) => (
              <Tab
                onMouseOver={() => handleMouseOver(val.url)}
                key={val.url}
                label={val.title}
                className='tab px-1'
                value={val.url}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {isLogoutShow && (
        <div>
          <Chip
            label='로그아웃'
            onClick={handleLogout}
            onDelete={() => {}}
            className='text-coolgray-500 font-medium text-xs xs:mr-1 md:mr-5'
            deleteIcon={<LogoutIcon />}
          />
        </div>
      )}
    </Container>
  );
};

export { Header };
