import React, {useState} from 'react';
import {CloseButton, Container, Row, Table} from "react-bootstrap";
import s from '../directories.module.scss';
import {Button} from "@mui/material";
import ModalNewItem from "./ModalNewItem";
import ModalEditItem from "./ModalEditItem";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const AccountStatus = () => {
    const nameCols = [
        {name: "Код"},
        {name: "Наименование"},
        {name: "Сокращение"},
        {name: "Вид"},
        {name: "Наименование ЦБ РФ"},
        {name: "БИК"},
        {name: "Согл"},
        {name: "Действителен с"},
        {name: "по"},
    ]

    const example = [
        {
            key: "B016",
            name: "БАЙКАЛЬСКИЙ БАНК ПАО СБЕРБАНК",
            reduction: "",
            type: "банк",
            nameCBRF: "БАЙКАЛЬСКИЙ БАНК ПАО СБЕРБАНК",
            BIC: "042520607",
            isAgree: false,
            startDate: "01-01-2000",
            endDate: "02-01-2009",
        },

        {
            key: "B057",
            name: "БАНК \"ВБРР\" (AO)",
            reduction: "",
            type: "банк",
            nameCBRF: "БАНК \"ВБРР' (AO)",
            BIC: "044525880",
            isAgree: false,
            startDate: "01-01-2000",
            endDate: "02-01-2014",
        },
    ]

    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const handleSetKey = (event) => {
        setKey(event.target.value);
    }

    const handleSetName = (event) => {
        setName(event.target.value);
    }
    const handleSetDate = (event) => {
        setDate(event.target.value);
    }


    const [data, setData] = useState(example);
    const [editData, setEditData] = useState({});
    const handleAddNewItem = (newData) => {
        let arr = data;
        arr.push(newData);
        setData(arr);
    }

    const handleEditItem = () => {
        if (editModalShow) {
            return (<ModalEditItem show={true}
                                   onHide={() => setEditModalShow(false)}
                                   data={editData}/>);
        } else return null;

    }

    return (
        <Container fluid className={s.main__container}>
            <Row className={s.search__container}>
                <label className={s.search__item}>
                    <p className={"col-2 m-auto"}>Код:</p>
                    <div className={s.search__item__textarea}>
                        <input type="text"
                               value={key}
                               onChange={handleSetKey}
                               className={s.textarea}/>
                        <CloseButton onClick={() => setKey("")}/>
                    </div>
                </label>
            </Row>

            <Row className={s.search__container}>
                <label className={s.search__item}>
                    <p className="col-2 m-auto">Наименование:</p>
                    <div className={s.search__item__textarea}>
                        <input type="text"
                               value={name}
                               onChange={handleSetName}
                               className={s.textarea}/>
                        <CloseButton onClick={() => setName("")}/>
                    </div>
                </label>
            </Row>

            <Row className={s.search__container}>
                <label className={s.search__item}>
                    <p className="col-2 m-auto">Действует на дату:</p>
                    <div className={s.search__item__textarea}>
                        <input type="date"
                               onChange={handleSetDate}
                               className={s.textarea}/>
                    </div>
                </label>
            </Row>

            <Row className={s.edit__area}>
                <button className={s.edit__area__btn}
                        onClick={() => setModalShow(true)}>
                    <AddRoundedIcon/>
                    Новая запись</button>
                <ModalNewItem
                    setNewDate={handleAddNewItem}
                    show={modalShow}
                    onHide={() => setModalShow(false)}/>
            </Row>
            <Row>
                <Table className={s.table} hover>
                    <thead>
                    {nameCols.map((item) => (
                        <th className={s.table__col}>{item.name}</th>
                    ))}
                    </thead>
                    <tbody>
                    {
                        data.map((item) => (

                            <tr onClick={() => {
                                setEditData(item);
                                setEditModalShow(true);
                            }}>
                                <td>{item.key}</td>
                                <td>{item.name}</td>
                                <td>{item.reduction}</td>
                                <td>{item.type}</td>
                                <td>{item.nameCBRF}</td>
                                <td>{item.BIC}</td>
                                <td>{item.isAgree}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                            </tr>

                        ))
                    }
                    {handleEditItem()}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default AccountStatus;