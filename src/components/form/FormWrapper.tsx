import { FC, memo } from 'react';

/** props */
interface IProps {
  className?: string;
  contentsClassName?: string;
  titleClassName?: string;
  title?: string;
}

/** component: Drawer 영역이나 Form 영역에서 각 영역을 감싸는 wrapper */
const FormWrapper: FC<IProps> = memo(
  ({ className, contentsClassName, titleClassName, title, children }) => (
    <div className={`mb-6 ${className}`}>
      <div className={`text-gray-500 font-semibold mb-4 ${titleClassName}`}>
        {title}
      </div>
      <div className={contentsClassName}>{children}</div>
    </div>
  ),
  (prev, next) => prev.title === next.title && prev.children === next.children,
);

export { FormWrapper };
