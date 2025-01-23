import { FC, ReactNode } from "react";

import WalletItem from "../WalletItem";
import MetaMaskIcon from "../../../../public/icons/metamsk.svg";
import CoinBaseIcon from "../../../../public/icons/coinbase.svg";
import PhantomIcon from "../../../../public/icons/phantom.svg";
import WalletConnectIcon from "../../../../public/icons/wallet-connect.svg";

import styles from "./WalletList.module.scss";
import { useConnect } from "wagmi";

type WalletListType = {
  onWalletConnection: () => void;
};

const WALLETS_ICONS: any = {
  MetaMask: MetaMaskIcon,
  "Coinbase Wallet": CoinBaseIcon,
  Phantom: PhantomIcon,
  WalletConnect: WalletConnectIcon,
};

const WalletList: FC<WalletListType> = ({ onWalletConnection }) => {
  const { connectors, connect } = useConnect();

  const onWalletSelect = (connector: any) => {
    connect({ connector });
    onWalletConnection();
  };

  return (
    <div className={styles.container}>
      {connectors.map((connector: any) => (
        <WalletItem
          key={connector.name}
          title={connector.name}
          icon={WALLETS_ICONS[connector.name]}
          onClick={() => onWalletSelect(connector)}
        />
      ))}
    </div>
  );
};

export default WalletList;
