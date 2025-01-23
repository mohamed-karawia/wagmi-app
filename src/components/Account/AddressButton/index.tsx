import { ButtonHTMLAttributes, FC, useState } from "react";
import { useBalance } from "wagmi";
import Image from "next/image";

import { shortenHexString } from "@/utils/strings";

import DownIcon from "../../../../public/icons/down.svg";
import SynergyIcon from "../../../../public/icons/synergy.svg";
import styles from "./AddressButton.module.scss";
import AddressModal from "../AddressModal";

interface AddressButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  address: `0x${string}`;
}

const AddressButton: FC<AddressButtonProps> = ({ address }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { data: balance } = useBalance({
    address,
  });

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  return (
    <>
      <button className={styles["button"]} onClick={openAddressModal}>
        <div className={styles["balance"]}>
          {balance?.formatted} {balance?.symbol}
        </div>
        <Image width={20} height={20} src={SynergyIcon} alt="synergy" />
        {shortenHexString(address)}
        <Image width={20} height={20} src={DownIcon} alt="chevron-down" />
      </button>
      <AddressModal
        isOpen={isAddressModalOpen}
        setIsOpen={setIsAddressModalOpen}
        address={address}
      />
    </>
  );
};

export default AddressButton;
