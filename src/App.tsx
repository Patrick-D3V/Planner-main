import * as React from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Cards from './Cards';
import CLocalStorage from './Classes/Webservices/CLocalStorage';
import { eSaveType, IWebservice } from './Interfaces';
import { amber, deepOrange, grey, blue, pink } from '@mui/material/colors';

const oWebservice: IWebservice = new CLocalStorage(eSaveType.Complete);
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function MyApp() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Box>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    // TODO: Create Themes
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // palette values for light mode
                            primary: blue,
                            neutral: {
                                main: '#64748B',
                                contrastText: '#fff'
                            }
                        }
                        : {
                            // palette values for dark mode
                            primary: pink,
                            neutral: {
                                main: '#64748B',
                                contrastText: '#fff'
                            }
                        }),
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <MyApp />
                <Cards oWebservice={oWebservice} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}