import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useState} from "react";
import {isCodeEq4Valid} from "./validation";
import {isDataSet} from "./validation";
import s from './directories.module.scss';

const ModalNewItemEq4 = (props) => {
    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [createUser, setCreateUser] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editUser, setEditUser] = useState("");


    const [errorKey, setErrorKey] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

    const cleanForm = () => {
        setKey("");
        setName("");
        setDateIn("");
        setDateOut("");
        setCreateDate("");
        setCreateUser("");
        setEditDate("");
        setEditUser("");
    }

    const handleSubmit = () => {
        setErrorKey(false);
        setErrorName(false);
        if (!isCodeEq4Valid(key)) {
            setErrorKey(true);
        }
        if (!isDataSet(name)) {
            setErrorName(true);
        }
        else if (isCodeEq4Valid(key) && isDataSet(name)) {
            setErrorName(false);
            console.log('here');
            setErrorKey(false);
            addNewItem();
        }
    }

    const addNewItem = () => {
        props.setNewDate({key, name, dateIn, dateOut, createDate, createUser, editDate, editUser});
        cleanForm();
        props.onHide();
    }

    const closeModal = () => {
        cleanForm();
        setErrorName(false);
        setErrorKey(false);
        props.onHide();
    }



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Новая запись
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Код</Form.Label>
                        <Form.Control type="text" value={key} onChange={(event) => {
                            setKey(event.target.value);
                            setErrorKey(false);
                        }}/>
                        <Form.Label>
                            {errorKey ? <p className={s.error}>Введите 4 символа</p> : null}
                        </Form.Label>

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) => {
                            setName(event.target.value);
                            setErrorName(false);
                        }}/>
                        <Form.Label>
                            {errorName ? <p className={s.error}>Необходимо заполнить данное поле</p> : null}
                        </Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} type="submit">add</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalNewItemEq4;