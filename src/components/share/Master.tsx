import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Footer } from './Footer';
import { IProps as IHeaderProps, Header } from './Header';
import { useAutoLogout } from '~/hooks/useAutoLogout';

export interface IProps extends IHeaderProps {
  /** children component */
  children?: ReactNode;
  /** 로그인 체크할지 여부 */
  isLoginCheck?: boolean;
}

const Master: FC<IProps> = ({
  isMenuShow = true,
  isLogoutShow = true,
  isLoginCheck = true,
  children,
}) => {
  const { isFetching, isOk } = useAutoLogout(isLoginCheck);

  const invalid = isLoginCheck && (isFetching || !isOk);

  if (invalid) {
    return <></>;
  }

  return (
    <Box className='flex flex-col h-full'>
      <CssBaseline />
      <Header isMenuShow={isMenuShow} isLogoutShow={isLogoutShow} />
      <Box
        component='main'
        className='bg-gray-100 w-full h-full overflow-auto flex flex-col'
      >
        <div className='py-[30px]' />
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export { Master };
