import { FC } from "react";

import WalletItem from "../WalletItem";
import styles from "./WalletList.module.scss";
import { useConnect } from "wagmi";
import { WALLETS_ICONS } from "@/constants/WALLET_ICONS";

type WalletListType = {
  onWalletConnection: () => void;
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
