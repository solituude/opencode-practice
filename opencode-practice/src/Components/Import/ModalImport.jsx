import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import s from "../Directories/directories.module.scss";
import {message} from "antd";

const ModalImport = (props) => {
    const username = 'user';
    const password = 'password';
    const headersUpload = new Headers();
    headersUpload.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    const [selectedFile, setSelectedFile] = useState();
    const [showError, setShowError] = useState(false);
    const [name, setName] = useState('');

    const handleFileSelect = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        if (selectedFile) {
            let queryString;
            if (name.length === 0) {
                queryString = new URLSearchParams({title: selectedFile.name}).toString();
            } else {
                queryString = new URLSearchParams({title: name}).toString();
            }

            console.log(queryString);
            try {
                let response = await fetch(`/api/ed807/upload?${queryString}`, {
                    method: 'POST',
                    headers: headersUpload,
                    body: formData
                })
                console.log('Ответ сервера:', response);
                if (response.ok) {
                    props.setIsLoading(true);
                    props.getData();
                    message.info(`Файл успешно добавлен`);
                    props.hide();
                } else {
                    setShowError(true);
                }

            } catch (error) {
                setShowError(true);
            }
        } else {
            setShowError(true);
        }

    }

    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Загрузка файла
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Выберите файл для импорта</Form.Label>
                    <Form.Control type="file" onChange={(event) => setSelectedFile(event.target.files[0])} />
                    <Form.Label>
                        {showError ? <p className={s.error}>Загрузите файл с расширением .xml</p> : null}
                    </Form.Label>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control type="text" value={name} onChange={(event) =>
                        setName(event.target.value)}/>
                </Form.Group>

                <Modal.Footer>
                    <button className={s.btn_submit} onClick={() => handleFileSelect()} type="submit">Загрузить файл</button>
                    <button className={s.btn_cancel} onClick={props.hide}>Отмена</button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export default ModalImport;