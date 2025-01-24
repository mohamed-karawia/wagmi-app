"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

import Button from "@/components/Button";
import Account from "@/components/Account";
import WalletList from "@/components/Wallet/WalletList";

import styles from "./page.module.scss";
import ErrorMessage from "@/components/ErrorMessage";

function App() {
  const [isWalletsModalOpen, setIsWalletsModalOpen] = useState(false);
  const [isConnectError, setIsConnectError] = useState(false);
  const { isConnected } = useAccount();

  const handleOpenWalletsModal = () => {
    setIsWalletsModalOpen(true);
  };

  const handleConnectError = (isError: boolean) => {
    setIsConnectError(isError);
  };

  return (
    <div className={styles["container"]}>
      {isConnected ? (
        <Account />
      ) : (
        <Button onClick={handleOpenWalletsModal}>Connect Wallet</Button>
      )}
      {isConnectError && (
        <div className={styles["container__error"]}>
          <ErrorMessage message="Failed to connect wallet" />
        </div>
      )}
      <WalletList
        isWalletsModalOpen={isWalletsModalOpen}
        setIsWalletsModalOpen={setIsWalletsModalOpen}
        handleConnectError={handleConnectError}
      />
    </div>
  );
}

export default App;
