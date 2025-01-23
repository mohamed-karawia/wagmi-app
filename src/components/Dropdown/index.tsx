import Image from "next/image";
import { FC } from "react";
import Select, {
  components,
  StylesConfig,
  OptionProps,
  SingleValueProps,
} from "react-select";
import styles from "./Dropdown.module.scss";

export interface OptionType {
  label: string;
  value: string | number | undefined;
  icon: string | undefined;
}

interface DropdownProps {
  options: OptionType[];
  handleChange: (selectedOption: OptionType | null) => void;
  value: OptionType | null;
}

const selectStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#f2f5f8",
    border: "none",
    borderRadius: "10px",
    minWidth: "220px",
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

const Option: FC<OptionProps<OptionType, false>> = (props) => (
  <components.Option {...props} className={styles["custom-option"]}>
    {props?.data?.icon && (
      <Image
        src={props.data.icon}
        alt={props.data.label}
        width={30}
        height={30}
      />
    )}
    {props.data.label}
  </components.Option>
);

const SingleValue: FC<SingleValueProps<OptionType, false>> = ({
  children,
  ...props
}) => (
  <components.SingleValue {...props} className={styles["selected-option"]}>
    {props.data.icon && (
      <Image src={props.data.icon} alt="s-logo" width={20} height={20} />
    )}
    {children}
  </components.SingleValue>
);

const Dropdown: FC<DropdownProps> = ({ options, handleChange, value }) => {
  return (
    <div>
      <Select<OptionType>
        className={styles["select"]}
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
