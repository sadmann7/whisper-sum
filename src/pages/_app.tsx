import ToasterWrapper from "@/components/ui/ToasterWrapper";
import DefaultLayout from "@/layouts/DefaultLayout";
import "@/styles/globals.css";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{
  dehydratedState: DehydratedState;
}> & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>
            WhisperSum - Summarize Your Audio and Video Content with AI
          </title>
        </Head>
        {getLayout(<Component {...pageProps} />)}
        <ToasterWrapper />
      </Hydrate>
    </QueryClientProvider>
  );
}
