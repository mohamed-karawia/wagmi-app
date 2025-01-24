import { FC, useMemo } from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size: number;
  color: string;
}

const Spinner: FC<SpinnerProps> = ({ size, color }) => {
  const spinnerSize = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
      border: `3px solid ${color}`,
    }),
    [size, color]
  );

  return <span className={styles.loader} style={spinnerSize}></span>;
};

export default Spinner;
