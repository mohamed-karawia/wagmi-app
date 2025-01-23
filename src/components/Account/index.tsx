import React, { useMemo } from "react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";

import { CHAINS_ICONS } from "@/constants/CHAINS_ICONS";
import { mapItemToDropdownItem } from "@/utils/dropdown";
import Button from "@/components/Button";
import Dropdown, { OptionType } from "@/components/Dropdown";
import SignMessage from "@/components/SignMessage";

import styles from "./Account.module.scss";
import Address from "./AddressButton";
import LogoutIcon from "../../../public/icons/logout.svg";

type CurrentChainProps = {
  label: string;
  value: 1 | 56 | undefined;
  icon: string | undefined;
};

interface SelectedOption extends OptionType {
  value: 1 | 56;
}

const Account = () => {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

  const currentChain: CurrentChainProps = useMemo(
    () => mapItemToDropdownItem(chain, CHAINS_ICONS),
    [chain]
  );

  const chainsOptions: OptionType[] = useMemo(() => {
    return chains.map((chain) => mapItemToDropdownItem(chain, CHAINS_ICONS));
  }, [chains]);

  const handleChainSwitching = (option: OptionType | null) => {
    if (option) {
      const selectedOption = option as SelectedOption;
      switchChain({ chainId: selectedOption.value });
    }
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
