import { ICellRendererParams } from '@ag-grid-community/core';

/** component: 일반 텍스트 렌더러
 * 1. row height 가 높아 졌을 때 vertical align 을 중간으로 세팅해줘야 해서
 *    해당 텍스트를 span 으로 감싸고 span 을 감싸는 div 에서 flex, align-items 을 center 로
 *    세팅하여 중간에 위치 시키게 함
 * 2. 일반적인 frameworkComponents 컴포넌트로 제작시 깜박임 문제가 있어
 *    HTMLSpanElement 를 반환하는 형태로 만듬
 */
const AgRendererText = (params: ICellRendererParams) => {
  var wrapper = document.createElement('span');
  wrapper.className = 'block overflow-hidden overflow-ellipsis whitespace-nowrap';
  wrapper.innerHTML = params.value;

  return wrapper;
};

export { AgRendererText };
