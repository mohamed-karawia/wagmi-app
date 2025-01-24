import { FC } from "react";
import { useConnect } from "wagmi";

import { WALLETS_ICONS } from "@/constants/WALLET_ICONS";

import WalletItem from "../WalletItem";
import styles from "./WalletList.module.scss";
import ModalComponent from "@/components/Modal";

type WalletListType = {
  isWalletsModalOpen: boolean;
  setIsWalletsModalOpen: (value: boolean) => void;
  handleConnectError: (isError: boolean) => void;
};

const WalletList: FC<WalletListType> = ({
  isWalletsModalOpen,
  setIsWalletsModalOpen,
  handleConnectError,
}) => {
  const { connectors, connect } = useConnect();

  const onWalletSelect = (connector: any) => {
    connect(
      { connector },
      {
        onSuccess: () => {
          handleConnectError(false);
        },
        onError: () => {
          handleConnectError(true);
        },
      }
    );
    setIsWalletsModalOpen(false);
  };

  return (
    <div className={styles["container"]}>
      <ModalComponent
        isOpen={isWalletsModalOpen}
        setIsOpen={setIsWalletsModalOpen}
        title="Connect Wallet"
      >
        {connectors.map((connector: any) => (
          <WalletItem
            key={connector.name}
            title={connector.name}
            icon={WALLETS_ICONS[connector.name]}
            onClick={() => onWalletSelect(connector)}
          />
        ))}
      </ModalComponent>
    </div>
  );
};

export default WalletList;
