import { FC, ReactNode } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  title?: string;
  children: ReactNode;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#131313",
    borderRadius: "24px",
    padding: "16px 20px",
    minWidth: "496px",
  },
};

const ModalComponent: FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className={styles.heading}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.icon} onClick={closeModal}>
          &#x2715;
        </span>
      </div>
      <div className={styles.content}>{children}</div>
    </Modal>
  );
};

export default ModalComponent;
