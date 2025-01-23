import Image from "next/image";
import React, { ChangeEvent, FC, ReactNode } from "react";
import Select, { components, SingleValue } from "react-select";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  options: OptionProps[];
  icon?: React.ReactNode;
  prefix?: string;
  handleChange: (e: OptionProps) => void;
  value: OptionProps;
}

type OptionProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
};

const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#f2f5f8",
    border: "none",
    borderRadius: "10px",
    minWidth: "200px",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "blue",
    color: "white",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "black",
  }),
};

const Option = (props) => (
  <components.Option {...props} className={styles["custom-option"]}>
    <Image
      src={props.data.icon}
      alt={props.data.label}
      width={30}
      height={30}
    />
    {props.data.label}
  </components.Option>
);

const Dropdown: FC<DropdownProps> = ({ options, handleChange, value }) => {
  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props} className={styles["selected-option"]}>
      <Image src={value.icon} alt="s-logo" width={20} height={20} />
      {children}
    </components.SingleValue>
  );

  return (
    <div>
      <Select
        className={styles.select}
        value={value}
        options={options}
        onChange={handleChange}
        components={{
          Option,
          SingleValue,
          IndicatorSeparator: () => null,
        }}
        styles={selectStyles}
      />
    </div>
  );
};

export default Dropdown;
