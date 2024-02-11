import type { FC } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { store } from "../store";
import { createTheme } from "../theme";
import { Button, Container } from "@mui/material";
import Appbar from "../components/appbar";
import Layout from "../components/Layout";
import { AppProvider } from "../context/AppContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from "../context/CartContext";
import AppDrawer from "../components/appdrawer";
import { UiProvider } from "../context/UiContext";

type EnhancedAppProps = AppProps & {
  Component: NextPage;
};

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>E-commerce Prof</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {/* <ReduxProvider store={store}> */}
      {/* <AuthProvider> */}
      <UiProvider>
        <CartProvider>
          <AppProvider>
            <ThemeProvider
              theme={createTheme({
                responsiveFontSizes: true,
              })}
            >
              <Layout />
              <Container maxWidth="xl">
                <CssBaseline />
                <Toaster position="top-center" />
                {/* <SettingsButton /> */}
                {/* <AuthConsumer> */}
                {getLayout(<Component {...pageProps} />)}
                {/* </AuthConsumer> */}
                <AppDrawer />
              </Container>
            </ThemeProvider>
          </AppProvider>
        </CartProvider>
      </UiProvider>

      {/* </AuthProvider> */}
    </>
  );
};

export default App;
