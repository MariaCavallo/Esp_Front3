import Head from "next/head";
import { AppProps } from "next/app"; 
import createEmotionCache from "../createEmotionCache";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import '@/styles/globals.css'


const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = createTheme({});

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Newsletter</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  ) 
}
