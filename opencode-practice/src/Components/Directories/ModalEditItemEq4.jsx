import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";

const ModalEditItemEq4 = (props) => {
    const [key, setKey] = useState(props.data.key);
    const [name, setName] = useState(props.data.name);
    const [dateIn, setDateIn] = useState(props.data.dateIn);
    const [dateOut, setDateOut] = useState(props.data.dateOut);
    const [createDate, setCreateDate] = useState(props.data.createDate);
    const [createUser, setCreateUser] = useState(props.data.createUser);
    const [editDate, setEditDate] = useState(props.data.editDate);
    const [editUser, setEditUser] = useState(props.data.editUser);

    const closeModal = () => {
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактирование записи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Код</Form.Label>
                        <Form.Control type="text"
                                      value={key}
                                      defaultValue={props.data.key}
                                      onChange={(event) =>
                            setKey(event.target.value)}/>
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
                <Button type="submit">edit</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditItemEq4;