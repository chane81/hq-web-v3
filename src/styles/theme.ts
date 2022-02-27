import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: `'Noto Sans KR', -apple-system, Roboto, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif`
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 400
        }
      }
    }
  },
  palette: {
    primary: {
       main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    info: {
      main: '#bdbdbd',
      light: '#eeeeee',
      dark: '#9e9e9e',
      contrastText: '#424242', 
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff'
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff'
    },
    grey: {
      '50': '#fafafa',
      '100': '#f5f5f5',
      '200': '#eeeeee',
      '300': '#e0e0e0',
      '400': '#bdbdbd',
      '500': '#9e9e9e',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
      'A100': '#f5f5f5',
      'A200': '#eeeeee',
      'A400': '#bdbdbd',
      'A700': '#616161',
    }
  },
});

export default theme;