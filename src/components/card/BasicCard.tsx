import { FC, ReactNode } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

/** props */
interface IProps {
  /** css class */
  className?: string;
  /** title css class */
  titleClassName?: string;
  /** contents css class */
  contentsClassName?: string;
  /** title */
  title?: ReactNode;
  /** width full 여부 */
  isWidthFull?: boolean;
}

/** component: 기본 카드 */
const BasicCard: FC<IProps> = ({
  className,
  titleClassName,
  contentsClassName,
  title,
  children,
  isWidthFull = false,
}) => {
  return (
    <div
      className={overrideTailwindClasses(
        `${
          isWidthFull ? 'w-full' : 'w-112'
        } flex flex-col border bg-white rounded-lg shadow-lg border-coolGray-300 p-4 ${className}`,
      )}
    >
      {title && <div className={titleClassName}>{title}</div>}
      <div className={`flex-1 ${contentsClassName}`}>{children}</div>
    </div>
  );
};

export { BasicCard };
