const withPlugins = require('next-compose-plugins');
const dotenv = require('dotenv');

const isDev = process.env.NODE_ENV === 'development';
const env =
  dotenv.config({ path: `./env/.env.${isDev ? 'dev' : 'prod'}` }).parsed || {};

// next config 타입 힌트
/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   loader: 'default',
  //   domains: ['s3-k-networking.s3.ap-northeast-2.amazonaws.com'],
  // },

  reactStrictMode: true,

  experimental: {
    esmExternals: false
  },

  outputFileTracing: false,

  eslint: {
    ignoreDuringBuilds: !isDev
  },

  typescript: {
    ignoreBuildErrors: !isDev
  },

  // .env 값 세팅
  env,

  // production 빌드에서 소스맵 생성 여부
  productionBrowserSourceMaps: false,

  // webpack 5 사용 여부 >> next.js 11 미만 버전에서 아래와 같이 future > webpack5 로 webpack5버전 설정을 할 수 있었으나
  // next.js 11 버전부터는 webpack5 가 기본이다.
  // future: {
  //   webpack5: true,
  // },

  // 웹팩 설정
  webpack: (config, options) => {
    const originalEntry = config.entry;
    config.plugins = config.plugins || [];

    // webpack 5 일 경우
    // webpack 5 부터는 config.node 안씀 -> resolve.fallback 써야함
    if (!options.isServer) {
      config.resolve.fallback = {
        // fs: false,
        // crypto: false,
        // path: false,
        // stream: false,
        // module: false,
        // os: false,
        // util: false,
        // buffer: false,
      };
    }

    // 개발모드인지 여부 true/false
    // console.log('is development mod?:', options.dev);

    // 기본 플러그인 어떤것을 로드하는지 확인
    // config.plugins.map(data => {
    //   console.log('config name:', data.constructor.name);
    // })

    // 옵션정보 확인
    // console.log('options:', options);

    // entry 설정
    config.entry = async () => {
      const entries = await originalEntry();

      return entries;
    };

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
