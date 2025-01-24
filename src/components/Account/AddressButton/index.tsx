import { ButtonHTMLAttributes, FC, useState } from "react";
import { useBalance } from "wagmi";
import Image from "next/image";

import { shortenHexString } from "@/utils/strings";

import DownIcon from "../../../../public/icons/down.svg";
import SynergyIcon from "../../../../public/icons/synergy.svg";
import styles from "./AddressButton.module.scss";
import AddressModal from "../AddressModal";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

interface AddressButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  address: `0x${string}`;
  isAddressLoading?: boolean;
}

const AddressButton: FC<AddressButtonProps> = ({
  address,
  isAddressLoading,
}) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const {
    data: balance,
    isLoading,
    isError,
  } = useBalance({
    address,
  });

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const renderAddress = () => {
    if (isAddressLoading) {
      return (
        <div className={styles["button"]}>
          <Spinner size={20} color="black" />
        </div>
      );
    } else {
      return (
        <button className={styles["button"]} onClick={openAddressModal}>
          <div className={styles["balance"]}>
            {isLoading ? (
              <Spinner size={20} color="black" />
            ) : (
              <p aria-label={balance?.formatted}>
                {balance?.formatted} {balance?.symbol}
              </p>
            )}
          </div>
          <Image width={20} height={20} src={SynergyIcon} alt="synergy" />
          {shortenHexString(address)}
          <Image width={20} height={20} src={DownIcon} alt="chevron-down" />
        </button>
      );
    }
  };

  return (
    <>
      {renderAddress()}
      {isError && <ErrorMessage message="Failed to fetch balance" />}
      <AddressModal
        isOpen={isAddressModalOpen}
        setIsOpen={setIsAddressModalOpen}
        address={address}
      />
    </>
  );
};

export default AddressButton;
