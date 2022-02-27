import {
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
} from 'react';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from 'twin.macro';

/** Props */
interface IProps {
  className?: string;
  totalCount: number;
  defaultPageNo?: number;
  pageSize: number;
  pageBlockSize?: number;
  pagePosition?: 'left' | 'right' | 'center';
  isManualPageAction?: boolean;
  opClick?: (pageNo: number, blockNo?: number) => void;
}

/** ref */
export interface IRefPaging {
  /** 페이징 초기화 */
  setInit: () => any;
  setManualPaging: (pageNo: number, blockNo: number) => void;
  pageNo: number;
  pageBlock: number;
  pageBlockCount: number;
}

/** style */
const PagingWrapper = styled('div')<IProps>`
  display: ${(props) => (props.totalCount > 0 ? 'flex' : 'none')};
  justify-content: ${(props) =>
    props.pagePosition === 'left'
      ? 'flex-start'
      : props.pagePosition === 'right'
      ? 'flex-end'
      : 'center'};
  width: 100%;
`;

/** Component */
const Paging: ForwardRefRenderFunction<IRefPaging, IProps> = (props, ref) => {
  // 페이지 블럭 사이즈
  const pgBlockSize = props.pageBlockSize ?? 10;

  // 현재 페이지 번호
  const [currentPageNoState, setCurrentPageNoState] = useState(
    props.defaultPageNo ?? 1,
  );

  // 현재 페이지 블럭 위치
  const [currentPageBlockState, setCurrentPageBlockState] = useState(
    Math.ceil(currentPageNoState / pgBlockSize),
  );

  // 페이지 번호 상태값이 변경시
  useEffect(() => {
    if (props.totalCount > 0) {
      props.opClick?.(currentPageNoState, currentPageBlockState);
    }
  }, [currentPageNoState, currentPageBlockState]);

  // ref method
  useImperativeHandle(ref, () => ({
    setInit: () => {
      setCurrentPageNoState(props.defaultPageNo ?? 1);
      setCurrentPageBlockState(1);
    },
    setManualPaging: (pageNo: number, blockNo: number) => {
      setCurrentPageNoState(pageNo);
      setCurrentPageBlockState(blockNo);
    },
    pageNo: currentPageNoState,
    pageBlock: currentPageBlockState,
    pageBlockCount: pageBockCount,
  }));

  // 총 페이지 수
  const pageCount = Math.ceil(props.totalCount / props.pageSize);

  // 페이지 블럭 수
  const pageBockCount = Math.ceil(pageCount / pgBlockSize);

  // 페이지 번호 클릭시
  const handlePageNoClick = (e) => {
    e.preventDefault();

    const pageNo = parseInt(e.currentTarget.innerText, 10);

    // 수동 페이징 액션에 대한 로직
    if (!props.isManualPageAction) {
      setCurrentPageNoState(pageNo);
    }
  };

  // 제일 처음, 이전, 제일 뒤, 다음 버튼 클릭시
  const handlePageMoveClick = (e, gubun) => {
    e.preventDefault();

    let blockNo = currentPageBlockState;

    // 제일 처음 클릭시
    if (currentPageBlockState !== 1 && gubun === 'first') {
      blockNo = 1;
    }

    // 이전 블럭 클릭시
    if (currentPageBlockState !== 1 && gubun === 'prev') {
      blockNo = currentPageBlockState - 1;
    }

    // 다음 블럭 클릭시
    if (currentPageBlockState !== pageBockCount && gubun === 'next') {
      blockNo = currentPageBlockState + 1;
    }

    // 제일 뒤로 클릭시
    if (currentPageBlockState !== pageBockCount && gubun === 'last') {
      blockNo = pageBockCount;
    }

    const pageNo =
      blockNo * (props.pageBlockSize ?? 0) - (props.pageBlockSize ?? 0) + 1;

    // 수동 페이징 액션에 대한 로직
    if (!props.isManualPageAction) {
      // 페이지번호 상태 update
      setCurrentPageNoState(pageNo);

      // 블럭번호 상태 update
      setCurrentPageBlockState(blockNo);
    }
  };

  // page 번호 아이템들 generators
  function* pageNoItem() {
    // 표시할 시작 페이지 번호
    const startPage = (currentPageBlockState - 1) * pgBlockSize + 1;

    // 표시할 마지막 페이지 번호
    let endPage = currentPageBlockState * pgBlockSize;
    endPage = pageCount < endPage ? pageCount : endPage;

    for (let displayPage = startPage; displayPage <= endPage; displayPage++) {
      yield (
        <PaginationItem
          color='primary'
          selected={displayPage === currentPageNoState}
          key={displayPage}
          page={displayPage}
          onClick={handlePageNoClick}
        />
      );
    }
  }

  return (
    <PagingWrapper {...props}>
      <div className='page-nav' aria-label='Page navigation example'>
        {/* 제일 앞으로 */}
        <PaginationItem
          type='first'
          onClick={(e) => handlePageMoveClick(e, 'first')}
          disabled={currentPageBlockState === 1}
        />

        {/* 이전 블럭 */}
        <PaginationItem
          type='previous'
          onClick={(e) => handlePageMoveClick(e, 'prev')}
          disabled={currentPageBlockState === 1}
        />

        {/* 페이지 번호 */}
        {/* {[...pageNoItem()]} */}
        {Array.from(pageNoItem())}

        {/* 다음 블럭 */}
        <PaginationItem
          type='next'
          onClick={(e) => handlePageMoveClick(e, 'next')}
          disabled={currentPageBlockState === pageBockCount}
        />

        {/* 제일 뒤로 */}
        <PaginationItem
          type='last'
          onClick={(e) => handlePageMoveClick(e, 'last')}
          disabled={currentPageBlockState === pageBockCount}
        />
      </div>
    </PagingWrapper>
  );
};

export default forwardRef(Paging);
