import { FC, ReactNode } from "react";

import WalletItem from "../WalletItem";
import MetaMaskIcon from "../../../../public/icons/metamsk.svg";
import CoinBaseIcon from "../../../../public/icons/coinbase.svg";
import PhantomIcon from "../../../../public/icons/phantom.svg";
import WalletConnectIcon from "../../../../public/icons/wallet-connect.svg";

import styles from "./WalletList.module.scss";
import { UseConnectorsReturnType, Connector } from "wagmi";

type WalletIcons = {
  MetaMask: ReactNode;
  "Coinbase Wallet": ReactNode;
  Phantom: ReactNode;
  WalletConnect: ReactNode;
};

type WalletListType = {
  connectors: any;
  handleConnectWallet: (connector: any) => void;
};

const WALLETS_ICONS: any = {
  MetaMask: MetaMaskIcon,
  "Coinbase Wallet": CoinBaseIcon,
  Phantom: PhantomIcon,
  WalletConnect: WalletConnectIcon,
};

const WalletList: FC<WalletListType> = ({
  connectors,
  handleConnectWallet,
}) => {
  return (
    <div className={styles.container}>
      {connectors.map((connector: any) => (
        <WalletItem
          title={connector.name}
          icon={WALLETS_ICONS[connector.name]}
          onClick={() => handleConnectWallet(connector)}
        />
      ))}
    </div>
  );
};

export default WalletList;
