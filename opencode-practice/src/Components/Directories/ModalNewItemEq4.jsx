import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useState} from "react";
import {isCodeEq4Valid} from "./validation";
import {isDataSet} from "./validation";
import {isDateValid} from "./validation";
import s from './directories.module.scss';

const ModalNewItemEq4 = (props) => {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [validityStart, setValidityStart] = useState("");
    const [validityEnd, setValidityEnd] = useState("");
    const [errorCode, setErrorCode] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

    const cleanForm = () => {
        setCode("");
        setName("");
        setValidityStart("");
        setValidityEnd("");
    }

    const handleSubmit = () => {
        setErrorCode(false);
        setErrorName(false);
        setErrorDate(false);
        if (!isCodeEq4Valid(code, props.type)) {
            setErrorCode(true);
        }
        if (!isDataSet(name)) {
            setErrorName(true);
        }
        if (!isDateValid(validityStart, validityEnd)){
            setErrorDate(true);
        }
        else if (isCodeEq4Valid(code) && isDataSet(name) && isDateValid(validityStart, validityEnd)) {
            setErrorName(false);
            console.log('here');
            setErrorCode(false);
            setErrorDate(false);
            addNewItem();
        }
    }

    const addNewItem = () => {
        props.setNewDate({"code": code, "name": name, "validityStart": validityStart, "validityEnd": validityEnd});
        cleanForm();
        props.onHide();
    }

    const closeModal = () => {
        cleanForm();
        setErrorName(false);
        setErrorCode(false);
        props.onHide();
    }

    let countSymbols;
    switch (props.type){
        case 'participantType':
            countSymbols = 2;
            break
        case 'availableServices':
            countSymbols = 1;
            break
        case 'exchangeParticipant':
            countSymbols = 1;
            break
        default:
            countSymbols = 4;
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
                        <Form.Control type="text" value={code} onChange={(event) => {
                            setCode(event.target.value);
                            setErrorCode(false);
                        }}/>
                        <Form.Label>
                            {errorCode ? (
                                props.type === 'participantType' ? (
                                    <p className={s.error}>Введите не более {countSymbols} символов</p>
                                ) : (<p className={s.error}>Введите {countSymbols} символ(а)</p>)
                            ) : null}
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

                    <Form.Group className="mb-3">
                        <Form.Label>Начало действия</Form.Label>
                        <Form.Control type="date" onChange={(event) => {
                            setValidityStart(event.target.value);
                            setErrorDate(false);
                        }}/>
                        <Form.Label>
                            {errorDate ? <p className={s.error}>Введите корректный период действия</p> : null}
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Окончание действия</Form.Label>
                        <Form.Control type="date" onChange={(event) => {
                            setValidityEnd(event.target.value);
                            setErrorDate(false);
                        }}/>
                        <Form.Label>
                            {errorDate ? <p className={s.error}>Введите корректный период действия</p> : null}
                        </Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} type="submit">Добавить</Button>
                <Button onClick={closeModal}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalNewItemEq4;