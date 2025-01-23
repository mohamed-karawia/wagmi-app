import { ButtonHTMLAttributes, FC } from "react";
import Image from "next/image";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
  icon?: string;
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "dark",
  icon,
  fullWidth,
  ...props
}) => {
  const buttonClass = `${styles["button"]} ${
    variant === "dark" ? styles["dark"] : styles["light"]
  } ${fullWidth ? styles["full-width"] : ""}`;

  return (
    <button className={buttonClass} {...props}>
      {icon && <Image src={icon} width={20} height={20} alt="logout" />}
      {children}
    </button>
  );
};

export default Button;
