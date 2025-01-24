import { FC } from "react";
import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <p className={styles["message"]}>{message}</p>;
};

export default ErrorMessage;
