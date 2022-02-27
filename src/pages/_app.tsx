import { ReactNode } from 'react';
import Head from 'next/head';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '~/utils/createEmotionCache';
import { initializeStore, StoreProvider } from '~/stores';
import { ToastContainer } from 'react-toastify';
import '~/styles/global.scss';
import '~/styles/build.css';
import theme from '~/styles/theme';
import 'react-toastify/dist/ReactToastify.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

/** react-query 기본 설정 */
const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});

interface AppProps extends AppLayoutProps {
  emotionCache?: EmotionCache;
}

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
  props: AppProps,
) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const store = initializeStore(pageProps.initialState);

  // mst 디버깅 로그
  // if (env.NODE_ENV === 'development') {
  //   // 크롬 console 에 해당값의 변화가 있을 때 나타나게 함
  //   onPatch(store, (patch) => {
  //     console.info(patch);
  //   });

  //   // 크롬 mobx tools 에 MST 로 상태변화를 볼 수 있게 한다.
  //   makeInspectable(store);
  // }

  return (
    <StoreProvider value={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>여물봐 Admin</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0'
          />
        </Head>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={reactQueryClient}>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>{' '}
          {/* 토스트 박스 */}
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            draggable={false}
            pauseOnFocusLoss={false}
            closeOnClick
            pauseOnHover
          />
          {/* 토스트 박스 */}
        </ThemeProvider>
      </CacheProvider>
    </StoreProvider>
  );
};

export default App;
