"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import styles from "./page.module.scss";
import Button from "@/components/Button";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className={styles.container}>
      <Button>Connect Wallet</Button>
    </div>
  );
}

export default App;
