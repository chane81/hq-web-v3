import { NextLayoutPage } from 'next';
import { ReactNode } from 'react';
import { Master, IProps } from '~/components/share/Master';

/**
 * 각 페이지 컴포넌트들마다 레이아웃 적용하기 위한 hoc
 * @param page 최상단 page 컴포넌트
 */
export function withLayout<T>(
  page: React.FC<T>,
  masterProps?: Omit<IProps, 'children'>,
) {
  (page as NextLayoutPage<T>).getLayout = (page: ReactNode) => (
    <Master {...masterProps}>{page}</Master>
  );
}
