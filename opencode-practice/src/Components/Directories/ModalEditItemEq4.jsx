import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useState} from "react";
import {isCodeEq4Valid, isDataSet, isDateValid} from "./validation";
import s from "./directories.module.scss";

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
        if (!isCodeEq4Valid(code, props.type)) {
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
            props.handleEditItem({"code": code, "name": name, "validityStart": validityStart, "validityEnd": validityEnd})
            props.onHide();
        }
    }

    let countSymbols;
    switch (props.type){
        case 'participantType':
            countSymbols = 2;
            break;
        case 'availableServices':
            countSymbols = 1;
            break;
        case 'exchangeParticipant':
            countSymbols = 1;
            break;
        default:
            countSymbols = 4;
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
                        <Form.Label>
                            {errorCode ? (
                                    props.type === 'participantType' ? (
                                            <p className={s.error}>Введите не более {countSymbols} символов</p>
                                        ) : (<p className={s.error}>Введите {countSymbols} символа</p>)
                            ) : null}
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) =>
                            setName(event.target.value)}/>
                        <Form.Label>
                            {errorName ? <p className={s.error}>Необходимо заполнить данное поле</p> : null}
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Период действия с</Form.Label>
                        <Form.Control type="date" onChange={(event) =>
                            setValidityStart(event.target.value)}/>
                        <Form.Label>
                            {errorDate ? <p className={s.error}>Введите корректный период действия</p> : null}
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>по</Form.Label>
                        <Form.Control type="date" onChange={(event) =>
                            setValidityEnd(event.target.value)}/>
                        <Form.Label>
                            {errorDate ? <p className={s.error}>Введите корректный период действия</p> : null}
                        </Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className={s.btn_submit} type="submit" onClick={handleSubmit}>Сохранить изменения</button>
                <button className={s.btn_cancel} onClick={closeModal}>Отмена</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditItemEq4;