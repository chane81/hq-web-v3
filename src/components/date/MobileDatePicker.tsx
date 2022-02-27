import { FC } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import koLocale from 'dayjs/locale/ko';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/MobileDatePicker';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import InputAdornment from '@mui/material/InputAdornment';

/** date picker theme */
const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
  },
});

/** props */
interface IProps {
  date: Date | null;
  format?: string;
  label?: string;
  okText?: string;
  cancelText?: string;
  opChange: (date: Date | null, keyboardInputValue?: string | undefined) => void;
}

/** component: 모바일용 달력 컴포넌트 */
const MobileDatePicker: FC<IProps> = ({
  date = new Date(),
  format = 'YYYY-MM-DD',
  label,
  okText = '확인',
  cancelText = '취소',
  opChange,
}) => {
  return (
    <ThemeProvider theme={materialTheme}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={koLocale}>
        <DatePicker
          label={label}
          showToolbar={false}
          inputFormat={format}
          views={['month', 'day']}
          value={!date ? new Date() : date}
          onChange={opChange}
          okText={okText}
          cancelText={cancelText}
          renderInput={(params) => (
            <TextField
              {...params}
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <EventAvailableTwoToneIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export { MobileDatePicker };
