import { useState } from "react";
import { useSignMessage } from "wagmi";
import Button from "../Button";
import styles from "./SignMessage.module.scss";
import ModalComponent from "../Modal";

const SignMessage = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { signMessage } = useSignMessage();

  const handleSignMessage = () => {
    signMessage(
      {
        message,
      },
      {
        onSuccess: () => {
          setMessage("");
        },
      }
    );
  };

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpenMessageModal} fullWidth>
        Sign Message
      </Button>
      <ModalComponent
        isOpen={isMessageModalOpen}
        setIsOpen={setIsMessageModalOpen}
        title="Sign Message"
      >
        <div className={styles["form"]}>
          <div className={styles["input-container"]}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className={styles["button-container"]}>
            <Button variant="light" onClick={handleSignMessage}>
              Sign
            </Button>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default SignMessage;
