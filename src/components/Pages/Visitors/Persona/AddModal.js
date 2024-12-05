import { Form, InputGroup } from 'react-bootstrap';
import Modal from '../../../../modules/Modal';

const AddModal = ({ onChange, reason, onConfirm, onCancel }) => {
  return (
    <Modal
      onConfirm={onConfirm}
      onCancel={onCancel}
      btnText={'Add to Person Non Grata'}
      title="Provide Reason"
    >
      <InputGroup>
        <Form.Control
          onChange={onChange}
          as="textarea"
          aria-label="Reason"
          rows={5}
        />
      </InputGroup>
    </Modal>
  );
};

export default AddModal;
