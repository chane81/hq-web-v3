import { FC } from 'react';
import Divider from '@mui/material/Divider';
import { overrideTailwindClasses } from 'tailwind-override';

/** props */
interface IProps {
  className?: string;
}

/** component: vertical divider */
export const VerticalDivider: FC<IProps> = ({ className }) => (
  <Divider
    orientation='vertical'
    variant='middle'
    flexItem
    className={overrideTailwindClasses(
      `border-solid border-1 border-gray-400 ${className}`,
    )}
  />
);
