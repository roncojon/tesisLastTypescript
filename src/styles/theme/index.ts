// /* eslint-disable sonarjs/no-duplicate-string */
import { createTheme } from '@mui/material';
import ItauDisplayLight from '../../assets/fonts/ItauDisplay_Lt.ttf' /* '../../assets/fonts/ItauDisplay_Lt.ttf' */;
import ItauDisplayRegular from '../../assets/fonts/ItauDisplay_Rg.ttf';
import ItauDisplayBd from '../../assets/fonts/ItauDisplay_Bd.ttf';
import ItauDisplayXBd from '../../assets/fonts/ItauDisplay_XBd.ttf';
import ItauDisplayBlk from '../../assets/fonts/ItauDisplay_Blk.ttf';
import ItauTextLt from '../../assets/fonts/ItauText_Lt.ttf';
import ItauTextRg from '../../assets/fonts/ItauText_Rg.ttf';
import ItauTextXBd from '../../assets/fonts/ItauText_XBd.ttf';
import ItauTextBd from '../../assets/fonts/ItauText_Bd.ttf';
import ItauIcons from '../../assets/fonts/itau_icons.ttf';

// const ItauFont = 'ItauDisplay-Regular';

const theme = createTheme({
  palette: {
    primary: {
      main: '#546576' /* #43B02A */,
      light: '#D0ECC9',
      dark: '#2C6424',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EC7000' /* #0072CE por defecto,   #EC7000 este es naranja */,
      light: '#E5F1FA',
      dark: '#0A5AA2',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#43B02A',
      light: '#D0ECC9',
      dark: '#2C6424',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0072CE',
      light: '#C0DBF3',
      dark: '#0A5AA2',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFCA40',
      light: '#FFEEBF',
      dark: '#8A670F',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E40046',
      light: '#FDE6E5',
      dark: '#D11203',
      contrastText: '#FFFFFF',
    },
    background: { default: '#f8f8f8', paper: '#ffffff' },
    text: { primary: '#444B62', secondary: '#A2A7BA', disabled: '#A2A7BA' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,   /* 1300 */
      xl: 1536,  /* 1440 */
    },
  },

  spacing: 4,
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'ItauDisplay-Light';
          font-style: normal;
          font-weight: 300;
          src:  url(${ItauDisplayLight}) format("truetype");
        }
        
        @font-face {
          font-family: 'ItauDisplay-Regular';
          font-style: normal;
          font-weight: normal;
          src:  url(${ItauDisplayRegular}) format("truetype");
        }
        
        @font-face {
          font-family: 'ItauDisplay-Bold';
          font-style: normal;
          font-weight: bold;
          src: url(${ItauDisplayBd}) format("truetype");
        }
        
        @font-face {
          font-family: 'ItauDisplay-XBold';
          font-style: normal;
          font-weight: 800;
          src: url(${ItauDisplayXBd}) format("truetype");
        }
        
        @font-face {
          font-family: 'itau-font';
          font-style: normal;
          font-weight: 900;
          src:  url(${ItauDisplayBlk}) format("truetype");
        }
        
        @font-face {
          font-family: 'ItauText-Light';
          font-style: normal;
          font-weight: 300;
          src: url(${ItauTextLt}) format("truetype");
        }
        
        @font-face {
          font-family: 'ItauText-Regular';
          font-style: normal;
          font-weight: normal;
          src: url(${ItauTextRg}) format("truetype");
        }
        
        @font-face {
          font-family: 'ItauText-Bold';
          font-style: normal;
          font-weight: 800;
          src: url(${ItauTextBd}) format("truetype");
        }
        
        @font-face {
          font-family: 'ItauText-XBold';
          font-style: normal;
          font-weight: 900;
          src: url(${ItauTextXBd}) format("truetype");
        }
        
        @font-face {
          font-family: 'itau-icon';
          font-style: normal;
          font-weight: normal;
          src: url(${ItauIcons}) format("truetype");
        }
      `,
    },
    MuiLink: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        /*  `
        h1 {
          color: grey;
        }
      `, */
      },
    },
    MuiTypography: {
      defaultProps: {
        color: 'textPrimary',
      },
    },
  },
  typography: {
    fontFamily: 'ItauDisplay-Regular, Arial',
    h2: {
      fontFamily: 'ItauText-Bold',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '20px',
      lineHeight: '28px',
      color: '#546576',
    },
    h3: {
      fontFamily: 'ItauDisplay-Regular',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '21px',
      color: '#43484C',
    },
    h4: {
      fontFamily: 'ItauDisplay-Bold',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#43484C',
    },
    h5: {
      fontFamily: 'ItauDisplay-Regular',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#43484C',
    },
    h6: {
      fontFamily: 'ItauDisplay-Regular',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '21px',
      color: '#43484C',
    },
    body1: {
      fontFamily: 'ItauDisplay-Regular',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#43484C',
    },
    body2: {
      fontFamily: 'ItauDisplay-Bold',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#43484C',
    },
  },
});

export default theme;
