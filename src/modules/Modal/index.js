import { useState } from "react";
import Button from "react-bootstrap/Button";
import CoreModal from "react-bootstrap/Modal";

const Modal = ({
  btnText,
  title,
  children,
  onConfirm,
  onCancel,
  extraProps = {},
  defaultShow = false,
}) => {
  const [show, setShow] = useState(defaultShow);

  const handleClose = () => {
    onCancel && onCancel();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {btnText}
      </Button>

      <CoreModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        {...extraProps}
      >
        <CoreModal.Header closeButton>
          <CoreModal.Title>{title}</CoreModal.Title>
        </CoreModal.Header>
        <CoreModal.Body>{children}</CoreModal.Body>
        <CoreModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </CoreModal.Footer>
      </CoreModal>
    </>
  );
};

export default Modal;
