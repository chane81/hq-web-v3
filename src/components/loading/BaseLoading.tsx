import { styled, css } from 'twin.macro';

/** Props */
interface IProps {
  isBgShow: boolean;
  top?: string;
  width?: string;
  height?: string;
}

/** style */
const LoadingWrapper = styled('div')<IProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => (props.top ? props.top : '0px')};
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
  color: #343a40;
  opacity: 0.9;
  z-index: 999 !important;
  ${(props: IProps) =>
    (props.isBgShow === undefined || props.isBgShow) &&
    css`
      background: rgba(100, 100, 100, 0.5);
    `};
`;

/** Component: 기본 로딩 컴포넌트 */
const BaseLoading: React.FC<IProps> = (props) => {
  return (
    <LoadingWrapper {...props}>
      <div className={`Loading ${props.isBgShow ? 'bg-show' : ''}`}>
        <i className='fas fa-spinner fa-spin fa-2x' />
      </div>
    </LoadingWrapper>
  );
};

export { BaseLoading };
