import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {isCodeEq4Valid, isDataSet, isDateValid} from "./validation";

const ModalEditItemEq4 = (props) => {

    const [code, setCode] = useState(props.data.code);
    const [name, setName] = useState(props.data.name);
    const [validityStart, setValidityStart] = useState(props.data.validityStart);
    const [validityEnd, setValidityEnd] = useState(props.data.validityEnd);

    const [errorCode, setErrorCode] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

    const closeModal = () => {
        props.onHide();
    }

    const handleSubmit = () => {
        setErrorCode(false);
        setErrorName(false);
        setErrorDate(false);
        if (!isCodeEq4Valid(code)) {
            setErrorCode(true);
        }
        if (!isDataSet(name)) {
            setErrorName(true)
        }
        if (!isDateValid(validityStart, validityEnd)){
            setErrorDate(true);
        }
        else if (isCodeEq4Valid(code) && isDataSet(name) && isDateValid(validityStart, validityEnd)) {
            setErrorName(false);
            console.log('here');
            setErrorCode(false);
            setErrorDate(false);
            // addNewItem();
            props.handleEditItem({"code": code, "name": name, "validityStart": validityStart, "validityEnd": validityEnd})
            props.onHide();
        }
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
                                      value={code}
                                      defaultValue={props.data.code}
                                      onChange={(event) =>
                            setCode(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) =>
                            setName(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Период действия с</Form.Label>
                        <Form.Control type="date" value={validityStart} onChange={(event) =>
                            setValidityStart(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>по</Form.Label>
                        <Form.Control type="date" value={validityEnd} onChange={(event) =>
                            setValidityEnd(event.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={handleSubmit}>Сохранить изменения</Button>
                <Button onClick={closeModal}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditItemEq4;