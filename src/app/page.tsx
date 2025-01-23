"use client";

import { useAccount } from "wagmi";
import styles from "./page.module.scss";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";
import WalletList from "@/components/Wallet/WalletList";
import Account from "@/components/Account";

function App() {
  const [isWalletsModalOpen, setIsWalletsModalOpen] = useState(false);
  const { isConnected } = useAccount();

  const handleOpenWalletsModal = () => {
    setIsWalletsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsWalletsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Modal
        isOpen={isWalletsModalOpen}
        setIsOpen={setIsWalletsModalOpen}
        title="Connect Wallet"
      >
        <WalletList onWalletConnection={handleCloseModal} />
      </Modal>
      {isConnected ? (
        <Account />
      ) : (
        <Button onClick={handleOpenWalletsModal}>Connect Wallet</Button>
      )}
    </div>
  );
}

export default App;
