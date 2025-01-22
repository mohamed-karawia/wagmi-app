"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { State, WagmiProvider } from "wagmi";
import { http, createConfig } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, bsc],
  connectors: [
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId: "20642d3cf110a601de466dba9b0d4206" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
