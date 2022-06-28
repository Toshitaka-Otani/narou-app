import Head from "next/head";
import React, { ReactNode } from "react";

export const Layout = (props: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <Head>
        <title>なろうAPP</title>
      </Head>
      <>{props.children}</>
    </>
  );
};
