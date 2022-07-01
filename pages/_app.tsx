import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import { SimpleSidebar } from "../components/Drawer";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <Layout>
        <SimpleSidebar>
          <Component {...pageProps} />
        </SimpleSidebar>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
