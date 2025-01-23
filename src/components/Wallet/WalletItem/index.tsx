import { FC } from "react";
import styles from "./WalletItem.module.scss";
import Image from "next/image";

type WalletItemProps = {
  icon: string;
  title: string;
  onClick: () => void;
};

const WalletItem: FC<WalletItemProps> = ({ icon, title, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <Image width={40} height={40} alt={title} src={icon} />
      <h5 className={styles.title}>{title}</h5>
    </div>
  );
};

export default WalletItem;
