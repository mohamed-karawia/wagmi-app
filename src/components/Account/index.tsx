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
import ErrorMessage from "../ErrorMessage";

type CurrentChainProps = {
  label: string;
  value: 1 | 56 | undefined;
  icon: string | undefined;
};

interface SelectedOption extends OptionType {
  value: 1 | 56;
}

const Account = () => {
  const { address, chain, isConnecting } = useAccount();
  const { disconnect, isError: isDisconnectError } = useDisconnect();
  const {
    chains,
    switchChain,
    isError: isSwitchingChainError,
    isPending,
  } = useSwitchChain();

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
    <div className={styles.container}>
      <div className={styles["content"]}>
        <div>
          <Dropdown
            options={chainsOptions}
            handleChange={handleChainSwitching}
            value={currentChain}
            isLoading={isPending}
          />
        </div>

        <div className={styles["actions-container"]}>
          {address && (
            <Address isAddressLoading={isConnecting} address={address} />
          )}

          <div className={styles["buttons-container"]}>
            <SignMessage />

            <Button
              variant="light"
              icon={LogoutIcon}
              onClick={handleDisconnect}
              aria-label="Disconnect wallet"
            >
              Disconnect
            </Button>
          </div>
        </div>
      </div>
      {isDisconnectError && (
        <ErrorMessage
          message="
        Failed to disconnect wallet
      "
        />
      )}
      {isSwitchingChainError && (
        <ErrorMessage
          message="
        Failed to switch chain
        "
        />
      )}
    </div>
  );
};

export default Account;
