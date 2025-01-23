import React, { ReactNode, useMemo } from "react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import Dropdown from "../Dropdown";
import ETHIcon from "../../../public/icons/eth.svg";
import BSCIcon from "../../../public/icons/bsc.svg";
import styles from "./Account.module.scss";
import Address from "./AddressButton";
import Button from "../Button";
import LogoutIcon from "../../../public/icons/logout.svg";
import SignMessage from "../SignMessage";

const CHAINS_ICONS = {
  Ethereum: ETHIcon,
  "BNB Smart Chain": BSCIcon,
};

type customOptionProps = {
  label: string;
  value: 1 | 11155111;
  icon: ReactNode;
};

const Account = () => {
  const { address, chain } = useAccount();

  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

  const currentChain = useMemo(
    () => ({
      label: chain?.name,
      value: chain?.id,
      icon: CHAINS_ICONS[chain.name],
    }),
    [chain]
  );

  const chainsOptions = useMemo(() => {
    return chains.map((chain) => ({
      label: chain.name,
      value: chain.id,
      icon: CHAINS_ICONS[chain?.name],
    }));
  }, [chains]);

  const handleChainSwitching = (option: customOptionProps) => {
    switchChain({ chainId: option.value });
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className={styles["container"]}>
      <Dropdown
        options={chainsOptions}
        handleChange={handleChainSwitching}
        value={currentChain}
      />
      <div className={styles["actions-container"]}>
        {address && <Address address={address} />}

        <div className={styles["buttons-container"]}>
          <SignMessage />
          <Button variant="light" icon={LogoutIcon} onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
