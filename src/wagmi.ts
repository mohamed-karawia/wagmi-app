import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

export const getConfig = () => {
  return createConfig({
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
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
  });
};

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
