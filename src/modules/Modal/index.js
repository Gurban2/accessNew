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
          <div className="w-100 d-flex align-items-center gap-2 justify-content-end">
            <Button variant="danger" onClick={handleClose}>
              {t("general.close")}
            </Button>
            <Button variant="success" onClick={handleConfirm}>
              {t("general.confirm")}
            </Button>
          </div>
        </CoreModal.Footer>
      </CoreModal>
    </>
  );
};

export default Modal;
