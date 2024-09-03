import { Modal } from "react-bootstrap";
import { PropsTypes } from "./BasicModal.types";

export function BasicModal(props: PropsTypes) {
  const { show, close, title, children } = props;
  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
