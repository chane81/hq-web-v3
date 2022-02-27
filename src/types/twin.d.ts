/* eslint-disable @typescript-eslint/no-unused-vars */
import { DOMAttributes } from 'react';
import 'twin.macro';
import { css as cssImport } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import styledImport from '@emotion/styled';

// html 태그의 props 스타일로 사용할 속성의 타입
declare module 'react' {
  // html 일반 태그
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation;
    tw?: string;
  }

  // svg 용
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSInterpolation;
    tw?: string;
  }
}

// twin 모듈의 styled, css import 시 사용할 타입
declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
