import Head from "next/head";
import React, { ReactNode } from "react";

export const Layout = (props: { children: ReactNode; }) => {
  return (
    <>
      <Head>
        <title>なろうAPP</title>
      </Head>
      <>{props.children}</>
    </>
  );
};
