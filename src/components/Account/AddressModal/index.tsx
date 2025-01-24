import { FC, useState } from "react";
import Image from "next/image";

import ModalComponent from "@/components/Modal";
import { shortenHexString } from "@/utils/strings";

import styles from "./AddressModal.module.scss";
import SynergyIcon from "../../../../public/icons/synergy.svg";
import Button from "@/components/Button";

interface AddressModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  address: string;
}

const AddressModal: FC<AddressModalProps> = ({
  isOpen,
  setIsOpen,
  address,
}) => {
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setIsAddressCopied(true);
  };

  const handleClearCopy = () => {
    setIsAddressCopied(false);
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={handleClearCopy}
      title="Your Address"
    >
      <div className={styles["container"]}>
        <Image width={80} height={80} src={SynergyIcon} alt="synergy" />
        <h6>{shortenHexString(address)}</h6>
        {isAddressCopied ? (
          <p>Copied!</p>
        ) : (
          <Button
            variant="light"
            onClick={handleCopyAddress}
            aria-label="Copy address"
          >
            Copy Address
          </Button>
        )}
      </div>
    </ModalComponent>
  );
};

export default AddressModal;
