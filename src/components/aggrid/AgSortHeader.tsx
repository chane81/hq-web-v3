import React, { useEffect, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { IHeaderParams, Column, GridApi } from '@ag-grid-community/core';

// 소팅 type
export type TypeSort = '' | 'ASC' | 'DESC';

/** Props */
interface IProps {
  className?: string;
  params: IHeaderParams;
  enableMenu: boolean;
  enableSorting: boolean;
  menuIcon?: string;
  sort?: TypeSort;
  opSort?: (api: GridApi, column: Column, sort: TypeSort) => void;
}

/** style */
const AgSortHeaderWrapper = styled.div<IProps>`
  ${tw`flex justify-center items-center w-full gap-1 cursor-pointer`};

  .ag-header-cell-menu-button {
    transition: opacity 0.2s ease 0s, border 0.2s ease 0s;
  }
`;

/** Component: 소트 헤더 */
const AgSortHeader: React.FC<IProps> = (props) => {
  const refButton = useRef<HTMLSpanElement>(null);

  // 메뉴 아이콘 클릭시
  const handleMenuClick = () => {
    props.params.showColumnMenu(refButton.current!);
  };

  // 소팅 아이콘 클릭시
  const handleSortRequest = () => {
    const orderPayload =
      props.sort === ''
        ? 'DESC'
        : props.sort === 'DESC'
        ? 'ASC'
        : props.sort === 'ASC'
        ? ''
        : '';

    console.log('order', props.sort, orderPayload);

    // sorting 상태값 props 에 전달
    props.opSort?.(props.params.api, props.params.column, orderPayload);
  };

  // 메뉴 기능
  const menu = props.enableMenu && (
    <span
      ref={refButton}
      onClick={handleMenuClick}
      className='ag-header-icon ag-header-cell-menu-button'
      aria-hidden='true'
    >
      <span
        className={props.menuIcon ?? 'ag-icon ag-icon-menu '}
        unselectable='on'
      />
    </span>
  );

  // 소팅 기능
  const sort = props.enableSorting && (
    <>
      {/* ASC */}
      {props.sort === 'ASC' && (
        <span
          onClick={handleSortRequest}
          className='ag-header-icon ag-header-label-icon ag-sort ag-sort-ascending-icon'
          aria-hidden='true'
        >
          <span className='ag-icon ag-icon-asc' unselectable='on' />
        </span>
      )}
      {/* ASC */}

      {/* DESC */}
      {props.sort === 'DESC' && (
        <span
          onClick={handleSortRequest}
          className='ag-header-icon ag-header-label-icon ag-sort ag-sort-descending-icon'
          aria-hidden='true'
        >
          <span className='ag-icon ag-icon-desc' unselectable='on' />
        </span>
      )}
      {/* DESC */}

      {/* NONE */}
      {props.sort === '' && (
        <span
          onClick={handleSortRequest}
          className='ag-header-icon ag-header-label-icon ag-sort-none-icon'
          aria-hidden='true'
        >
          <span className='ag-icon ag-icon-none' unselectable='on' />
        </span>
      )}
      {/* NONE */}
    </>
  );

  return (
    <AgSortHeaderWrapper {...props} onClick={handleSortRequest}>
      {menu}
      <div className='customHeaderLabel'>{props.params.displayName}</div>
      {sort}
    </AgSortHeaderWrapper>
  );
};

export { AgSortHeader };
