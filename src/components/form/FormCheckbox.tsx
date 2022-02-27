import { FC, memo } from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';

/** props */
interface IProps {
  label?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  control?: any;
}

/** component:  Mui Checkbox 확장 */
const FormCheckbox: FC<IProps & CheckboxProps> = memo(
  ({ label, labelClassName, checkboxClassName, control, name, ...props }) => (
    <>
      {label ? (
        <FormControlLabel
          label={label}
          className={labelClassName}
          control={
            <Controller
              control={control}
              name={name || ''}
              render={({ field }) => (
                <MuiCheckbox
                  {...field}
                  className={checkboxClassName}
                  checked={field.value}
                  {...props}
                />
              )}
            />
          }
        />
      ) : (
        <Controller
          control={control}
          name={name || ''}
          render={({ field }) => (
            <MuiCheckbox
              {...field}
              className={checkboxClassName}
              checked={field.value}
              {...props}
            />
          )}
        />
      )}
    </>
  ),
  (prev, next) => prev.value == next.value,
);

export { FormCheckbox };
