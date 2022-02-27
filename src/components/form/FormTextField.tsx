import { FC, memo } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

/** props */
interface IProps {
  control?: any;
}

/** component:  Mui TextField 확장 */
const FormTextField: FC<IProps & TextFieldProps> = memo(
  ({ control, name, ...props }) => (
    <Controller
      control={control}
      name={name || ''}
      render={({ field }) => <MuiTextField {...field} {...props} />}
    />
  ),
  (prev, next) => prev.value == next.value && prev.error == next.error,
);

export { FormTextField };
