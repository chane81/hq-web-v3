import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { Children } from 'react';
import createEmotionCache from '~/utils/createEmotionCache';

interface IEmotionCss {
  ids: Array<string>;
  css: string;
}

export default class MyDocument extends Document<IEmotionCss> {
  render() {
    return (
      <Html>
        <Head>
          {/* 파비콘 들어갈 곳 */}
          <link
            rel='icon'
            type='image/svg'
            sizes='16x16'
            href='/images/icons/whale.ico'
          />
          {/* 파비콘 들어갈 곳 */}
          {/* 폰트 */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:wght@100;300;400;500;700;900&display=swap'
            rel='stylesheet'
          />
          {/* 폰트 */}
          {/* 아이콘 */}
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css'
            integrity='sha512-BnbUDfEUfV0Slx6TunuB042k9tuKe3xrD6q4mg5Ed72LTgzDIcLPxg6yI2gcMFRyomt+yJJxE+zJwNmxki6/RA=='
            crossOrigin='anonymous'
          />
          {/* 아이콘 */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  // const initialProps = await Document.getInitialProps(ctx);
  // const page = await ctx.renderPage();
  // const styles = extractCritical(page.html);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
