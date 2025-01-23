import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
}

const Button: FC<ButtonProps> = ({ children, variant = "dark", ...props }) => {
  const buttonClass = `${styles.button} ${variant ? styles[variant] : ""}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
