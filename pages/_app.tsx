import '@/styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { customTheme, darkTheme, lightTheme } from '@/themes';
import { CssBaseline, Theme } from '@mui/material';
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';


function App({ Component, pageProps }: AppProps) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  // El código dentro de useEffect se ejecuta en la parte cliente, no en servidor
  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme: Theme = 
      cookieTheme === 'light' ? lightTheme
      : cookieTheme === 'dark' ? darkTheme
      : customTheme;

    setCurrentTheme(selectedTheme);
  }, [])
  


  return (
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  )
}


export default App;