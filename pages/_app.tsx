import React from "react";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient());
  return (
    <QueryClientProvider client={queryClient.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
