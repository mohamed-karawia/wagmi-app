import { ButtonHTMLAttributes, FC } from "react";
import styles from "./AddressButton.module.scss";
import { shortenHexString } from "@/utils/strings";
import { useBalance } from "wagmi";
import DownIcon from "../../../../public/icons/down.svg";
import Image from "next/image";

interface AddressButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  address: `0x${string}`;
}

const AddressButton: FC<AddressButtonProps> = ({ address }) => {
  const { data: balance } = useBalance({
    address,
  });

  return (
    <button className={styles.button}>
      <div className={styles.balance}>
        {balance?.formatted} {balance?.symbol}
      </div>
      {shortenHexString(address)}
      <Image width={20} height={20} src={DownIcon} />
    </button>
  );
};

export default AddressButton;
