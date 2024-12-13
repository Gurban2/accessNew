import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import CoreModal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const Modal = ({
  btnText,
  title,
  children,
  onConfirm,
  onCancel,
  extraProps = {},
  defaultShow = false,
  onClick,
  btnProps = {},
  hideBtn = false,
}) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setShow(defaultShow);
  }, [defaultShow]);

  const handleClose = () => {
    onCancel && onCancel();
    setShow(false);
  };

  const handleShow = () => {
    onClick && onClick();
    setShow(true);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      {!hideBtn && (
        <Button variant="primary" onClick={handleShow} {...btnProps}>
          {btnText}
        </Button>
      )}

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
            {t("webcam.close")}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {t("webcam.confirm")}
          </Button>
        </CoreModal.Footer>
      </CoreModal>
    </>
  );
};

export default Modal;
