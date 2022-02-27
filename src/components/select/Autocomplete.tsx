import { FC, SyntheticEvent, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MuiAutocomplete, {
  AutocompleteProps,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material/Autocomplete';
import { Controller, Control } from 'react-hook-form';

/** props */
interface IProps {
  /** 패칭된 데이터 표현이라면 여기에 패칭 여부 넣을 것 */
  isFetching?: boolean;
  /** react-hook-form control */
  control?: Control<any, object>;
  /** name */
  name?: string;
  /** label 명 */
  label?: string;
  /** 에러 true/false */
  error?: boolean;
  /** 에러 발생시 사용할 helper text */
  helperText?: string;
  /** focused */
  focused?: boolean;
  /** placeholder */
  placeholder?: string;
  /** 값 필드명 */
  valueField?: string;
  /** change 이벤트 핸들러 */
  opChange?: (value: any) => void;
}
/** AutoComplete props */
type TAutoCompleteProps = Omit<
  AutocompleteProps<any, boolean, boolean, boolean>,
  'renderInput'
>;

/** Autocomplete 의 paper component */
const CustomPaper = (props) => {
  return <Paper elevation={8} {...props} />;
};

/** component */
const Autocomplete: FC<IProps & TAutoCompleteProps> = ({
  isFetching = false,
  control,
  name = '',
  label,
  error,
  helperText,
  focused,
  placeholder,
  valueField,
  opChange,
  ...props
}) => {
  const [opt, setOpt] = useState<any>(props.options);

  useEffect(() => {
    if (props.options) {
      setOpt(props.options);
    }
  }, [props.options]);

  //  change 이벤트 핸들러
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason,
    details: AutocompleteChangeDetails<any> | undefined,
    field: any,
  ) => {
    opChange?.(value || '');

    field.onChange(valueField && value ? value?.[valueField] : value || '');
  };

  // 옵션 value 매칭
  const handleOptionEqualToValue = (opt, value) => {
    if (props.isOptionEqualToValue) {
      return props.isOptionEqualToValue(opt, value);
    }

    if (valueField) {
      return opt[valueField] === value[valueField];
    }

    return opt === value;
  };

  // value setting 용
  const getValue = (field) => {
    const rtn =
      opt?.filter((v) => v[valueField || ''] === field.value)?.[0] || null;

    return rtn;
  };

  return (
    <>
      {!isFetching &&
        ![null, undefined].includes(control?._formValues[name || '']) && (
          <Controller
            control={control}
            name={name || ''}
            render={({ field }) => (
              <MuiAutocomplete
                {...props}
                onChange={(event, value, reason, detail) =>
                  handleChange(event, value, reason, detail, field)
                }
                options={opt}
                value={getValue(field)}
                isOptionEqualToValue={handleOptionEqualToValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={label}
                    error={error}
                    placeholder={placeholder}
                    focused={focused}
                    helperText={helperText}
                  />
                )}
                PaperComponent={CustomPaper}
                disablePortal
              />
            )}
          />
        )}
    </>
  );
};

export { Autocomplete };
