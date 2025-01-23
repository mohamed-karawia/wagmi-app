"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  Connector,
  useEnsName,
  useEnsAvatar,
} from "wagmi";
import styles from "./page.module.scss";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";
import WalletItem from "@/components/Wallet/WalletItem";
import WalletList from "@/components/Wallet/WalletList";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function App() {
  const [isWalletsModalOpen, setIsWalletsModalOpen] = useState(false);
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const handleOpenWalletsModal = () => {
    console.log("open");
    setIsWalletsModalOpen(true);
  };

  const onWalletSelect = (connector: any) => {
    setIsWalletsModalOpen(false);
    connect({ connector });
  };

  return (
    <div className={styles.container}>
      <Modal
        isOpen={isWalletsModalOpen}
        setIsOpen={setIsWalletsModalOpen}
        title="Connect Wallet"
      >
        <WalletList
          connectors={connectors}
          handleConnectWallet={onWalletSelect}
        />
      </Modal>
      <Button onClick={handleOpenWalletsModal}>Connect Wallet</Button>
    </div>
  );
}

export default App;
