import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
