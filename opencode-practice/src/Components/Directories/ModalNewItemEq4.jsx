import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useState} from "react";

const ModalNewItemEq4 = (props) => {
    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [createUser, setCreateUser] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editUser, setEditUser] = useState("");

    const cleanForm = () => {
        setKey("");
        setName("");
        setDateIn("");
        setDateOut("");
        setCreateDate("");
        setCreateUser("");
        setEditDate("false");
        setEditUser("");
    }

    const addNewItem = () => {
        props.setNewDate({key, name, dateIn, dateOut, createDate, createUser, editDate, editUser});
        cleanForm();
        props.onHide();
    }

    const closeModal = () => {
        cleanForm();
        props.onHide();
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Новая запись
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Код</Form.Label>
                        <Form.Control required type="text" controlId="validationCustom01" value={key} onChange={(event) =>
                            setKey(event.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) =>
                            setName(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Период действия с</Form.Label>
                        <Form.Control type="text" value={dateIn} onChange={(event) =>
                            setDateIn(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>по</Form.Label>
                        <Form.Control type="text" value={dateOut} onChange={(event) =>
                            setDateOut(event.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addNewItem} type="submit">add</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalNewItemEq4;