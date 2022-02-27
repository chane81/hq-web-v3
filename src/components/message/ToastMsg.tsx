import { FC } from 'react';
import { IResBase } from '~/types/apis/base';

/** props */
interface IProps {
  msg?: string;
  result?: IResBase;
}

/** 토스트 메시지 부분 컴포넌트 */
export const ToastMsg: FC<IProps> = ({ msg = '', result }) => (
  <div>
    <div>{msg}</div>
    {result?.RESULT_MSG && <div>{result?.RESULT_MSG}</div>}
  </div>
);
