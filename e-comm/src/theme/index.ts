'use client';
import { colors, type Theme } from '@mui/material';
import {
    createTheme as createMuiTheme,
    lighten,
    responsiveFontSizes,
} from '@mui/material/styles';
import theme from '../utils/mui/theme';

interface ThemeConfig {
    responsiveFontSizes?: boolean;
}

export const createTheme = (config: ThemeConfig): Theme => {
    let theme = createMuiTheme({
        palette: {
            primary: { main: '#5f2c3e' },
            secondary: { main: '#d1adcc', light: '#FAF9F9', dark: '#333'  },
            info: { main: '#FAF9F9' },
            border:{main: '#dddef1'}
        },
        typography: {
            fontFamily: '"Noto Sans Arabic", sans-serif',
        },

        components: {
        //     MuiButton: {
        //         defaultProps:{
        //             disableRipple: true,
        //             disableElevation: true
        //         }
        //     }
        MuiDrawer: {
            styleOverrides:{
                paper: {
                    width: 250,
                    background: `#5f2c3e`,
                    color: '#d1adcc',
                    borderRadius: '0px 100px 0px 0px',
                    borderRight: '5px solid #d1adcc'
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root:{
                    backgroundColor: lighten('#5f2c3e' , 0.2 )
                }
            }
        }
        }


        
    }
    
    );

    

    if (config.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return theme;
};
