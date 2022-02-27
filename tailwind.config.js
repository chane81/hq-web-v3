const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const twUtilCss = require('./src/styles/twUtilCss');

/** 필요한 text 컬러 safe list 로 등록 */
const safeColorText = () => {
  const safeText = [];

  const arrColor = [
    'gray',
    'red',
    'yellow',
    'orange',
    'green',
    'blue',
    'indigo',
    'purple',
    'pink',
    'white',
    'black',
  ];
  arrColor.forEach((col) => {
    safeText.push(`text-${col}`);
    safeText.push(`text-${col}-300`);
    safeText.push(`text-${col}-400`);
    safeText.push(`text-${col}-500`);
  });

  return safeText;
};

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  darkMode: false,
  important: true,
  prefix: '',
  purge: {
    content: ['./src/{pages,components,views}/**/*.{ts,jsx,tsx}'],
    // 반드시 tailwind css build 파일에 포함되어야 할 class 명이 있다면 아래에 명시
    safelist: [...safeColorText()],
  },
  theme: {
    screens: {
      xs: '475px',
      '3xl': '1600px',
      ...defaultTheme.screens,
    },
    fontSize: {
      tiny: '.55rem',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    colors: {
      // Now we build the full color palette, using all colors available
      // as shown at this link: https://tailwindcss.com/docs/customizing-colors#color-palette-reference
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      bluegray: colors.blueGray,
      coolgray: colors.coolGray,
      gray: colors.gray,
      truegray: colors.trueGray,
      warmgray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      colors: {
        lime: colors.lime,
        warmGray: colors.warmGray,
        coolGray: colors.coolGray,
      },
      width: {
        '112': '28rem/* 448px */',
        '128': '32rem/* 512px */',
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '1': '0.25rem/* 4px */',
        '2': '0.5rem/* 8px */',
        '3': '0.75rem/* 12px */',
        '4': '1rem/* 16px */',
        '5': '1.25rem/* 20px */',
        '6': '1.5rem/* 24px */',
        '7': '1.75rem/* 28px */',
        '8': '2rem/* 32px */',
        '9': '2.25rem/* 36px */',
        '10': '2.5rem/* 40px */',
        '11': '2.75rem/* 44px */',
        '12': '3rem/* 48px */',
        '14': '3.5rem/* 56px */',
        '16': '4rem/* 64px */',
        '20': '5rem/* 80px */',
        '24': '6rem/* 96px */',
        '28': '7rem/* 112px */',
        '32': '8rem/* 128px */',
        '36': '9rem/* 134px */',
        '40': '10rem/* 150px */',
        content: 'fit-content',
        full: '100%',
      },
    },
  },
  variants: {},
  plugins: [
    // 유틸리티성 class명 작성시(인텔리센스로 작동) 아래에 추가하여 입력
    plugin(({ addUtilities }) => {
      addUtilities(twUtilCss);
    }),
  ],
};
