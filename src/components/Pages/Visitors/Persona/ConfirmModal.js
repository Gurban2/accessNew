import { Form, InputGroup } from 'react-bootstrap';
import Modal from '../../../../components/Modal';



const AddModal = ({ onChange, reason, onConfirm, onCancel }) => {
    return (
        <Modal onConfirm={onConfirm} onCancel={onCancel} btnText={'Add to Person Non Grata'} title="Provide Reason">
            <InputGroup>
                <InputGroup.Text >{reason}</InputGroup.Text>
                <Form.Control onChange={onChange} as="textarea" aria-label="Reason" />
            </InputGroup>
        </Modal>
    )
}

export default AddModal