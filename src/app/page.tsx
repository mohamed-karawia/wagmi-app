"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Account from "@/components/Account";
import WalletList from "@/components/Wallet/WalletList";

import styles from "./page.module.scss";

function App() {
  const [isWalletsModalOpen, setIsWalletsModalOpen] = useState(false);
  const { isConnected } = useAccount();

  const handleOpenWalletsModal = () => {
    setIsWalletsModalOpen(true);
  };

  return (
    <div className={styles["container"]}>
      {isConnected ? (
        <Account />
      ) : (
        <Button onClick={handleOpenWalletsModal}>Connect Wallet</Button>
      )}

      <WalletList
        isWalletsModalOpen={isWalletsModalOpen}
        setIsWalletsModalOpen={setIsWalletsModalOpen}
      />
    </div>
  );
}

export default App;
