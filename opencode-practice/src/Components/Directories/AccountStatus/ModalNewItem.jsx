import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useState} from "react";

const ModalNewItem = (props) => {
    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const [reduction, setReduction] = useState("");
    const [type, setType] = useState("");
    const [nameCBRF, setNameCBRF] = useState("");
    const [BIC, setBIC] = useState("");
    const [isAgree, setIsAgree] = useState("false");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const cleanForm = () => {
        setKey("");
        setName("");
        setReduction("");
        setType("");
        setNameCBRF("");
        setBIC("");
        setIsAgree("false");
        setStartDate("");
        setEndDate("");
    }

    const addNewItem = () => {
        props.setNewDate({key, name, reduction, type, nameCBRF, BIC, isAgree, startDate, endDate});
        cleanForm();
        props.onHide();
    }

    const closeModal = () => {
        cleanForm();
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
                    Новая запись
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Код</Form.Label>
                        <Form.Control type="text" value={key} onChange={(event) =>
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
                <Button onClick={addNewItem}>add</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalNewItem;