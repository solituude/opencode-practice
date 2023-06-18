import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";

const ModalEditItem = (props) => {
    const [key, setKey] = useState(props.data.key);
    const [name, setName] = useState(props.data.name);
    const [reduction, setReduction] = useState(props.data.reduction);
    const [type, setType] = useState(props.data.type);
    const [nameCBRF, setNameCBRF] = useState(props.data.nameCBRF);
    const [BIC, setBIC] = useState(props.data.BIC);
    const [isAgree, setIsAgree] = useState(props.data.isAgree);
    const [startDate, setStartDate] = useState(props.data.startDate);
    const [endDate, setEndDate] = useState(props.data.endDate);

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
                        <Form.Label>Сокращение</Form.Label>
                        <Form.Control type="text" value={reduction} onChange={(event) =>
                            setReduction(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Вид</Form.Label>
                        <Form.Control type="text" value={type} onChange={(event) =>
                            setType(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Наименование ЦБ РФ</Form.Label>
                        <Form.Control type="text" value={nameCBRF} onChange={(event) =>
                            setNameCBRF(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>БИК</Form.Label>
                        <Form.Control type="text" value={BIC} onChange={(event) =>
                            setBIC(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Согл</Form.Label>
                        <Form.Control type="text" value={isAgree} onChange={(event) =>
                            setIsAgree(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Действителен с</Form.Label>
                        <Form.Control type="text" value={startDate} onChange={(event) =>
                            setStartDate(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>по</Form.Label>
                        <Form.Control type="text" value={endDate} onChange={(event) =>
                            setEndDate(event.target.value)} />
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

export default ModalEditItem;