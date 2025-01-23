import React, { ChangeEvent, ReactNode, useEffect, useMemo } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSwitchChain,
} from "wagmi";
import Dropdown from "../Dropdown";
import ETHIcon from "../../../public/icons/eth.svg";
import BSCIcon from "../../../public/icons/bsc.svg";
import styles from "./Account.module.scss";
import Address from "./AddressButton";

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
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { chains, switchChain, isSuccess, isError, data, isPending } =
    useSwitchChain();

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

  return (
    <div className={styles["container"]}>
      <Dropdown
        options={chainsOptions}
        handleChange={handleChainSwitching}
        value={currentChain}
      />
      <div className={styles["actions-container"]}>
        <Address address={address} />
      </div>
    </div>
  );
};

export default Account;
