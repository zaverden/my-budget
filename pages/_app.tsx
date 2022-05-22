import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { initializeApp } from "firebase/app";
import { AppProps } from "next/app";
import Head from "next/head";
import { extractPageConfig } from "@p/page";
import { createEmotionCache } from "../src/createEmotionCache";
import { theme } from "../src/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export default function MyApp(props: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { withLayout } = extractPageConfig(Component);

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {withLayout(<Component {...pageProps} />, pageProps)}
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}
