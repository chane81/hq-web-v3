import { FC, ReactNode } from 'react';
import { TColor } from '~/types/color';

/** props */
interface IProps {
  /** css class */
  className?: string;
  /** width full 여부 */
  isWidthFull?: boolean;
  /** 뱃지 color */
  color?: TColor;
  /** 뱃지 text color */
  textColor?: TColor;
  /** 뱃지 size */
  size?: 'xg' | 'lg' | 'sm' | 'xs' | 'tiny' | '';
  /** children */
  children?: ReactNode;
}

/** component: 버튼 */
const BadgeBread: FC<IProps> = ({
  className,
  isWidthFull,
  color,
  textColor,
  size,
  children,
}) => {
  // width
  const clsWidth = isWidthFull ? 'w-full' : 'w-auto';

  // 뱃지 컬러 class
  const clsBtn = `bge-${color}-bread `;

  // 뱃지 텍스트
  const clsTextColor = !textColor
    ? 'text-white'
    : ['white', 'black'].includes(textColor)
    ? `text-${textColor}`
    : `text-${textColor}-500`;
  const clsSize = `bge-${size}`;

  return (
    <div
      className={`flex items-center ${className} ${clsSize}  ${clsWidth} ${clsBtn} ${clsTextColor} `}
    >
      {children}
    </div>
  );
};

export { BadgeBread };
