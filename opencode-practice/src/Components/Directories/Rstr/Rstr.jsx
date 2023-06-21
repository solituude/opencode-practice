import React, {useState} from 'react';
import {CloseButton, Container, Row, Table} from "react-bootstrap";
import s from '../directories.module.scss';
import ModalNewItemEq4 from "../ModalNewItemEq4";
import ModalEditItemEq4 from "../ModalEditItemEq4";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Rstr = () => {

    const example = [];

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
            return (<ModalEditItemEq4 show={true}
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
                    Новая запись
                </button>
                <ModalNewItemEq4
                    setNewDate={handleAddNewItem}
                    show={modalShow}
                    onHide={() => setModalShow(false)}/>
            </Row>
            <Row>
                <Table className="align-middle" hover>
                    <tr>
                        <th style={{border: "1px solid #999CA5"}} className="col-1" rowSpan={2}>Код</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-5" rowSpan={2}>Наименование</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-2" colSpan={2}>Период действия</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-2" colSpan={2}>Создано</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-2" colSpan={2}>Изменено</th>
                    </tr>
                    <tr>
                        <th style={{border: "1px solid #999CA5"}} className="col-1">c</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-1">по</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-1">Дата</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-1">Пользователь</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-1">Дата</th>
                        <th style={{border: "1px solid #999CA5"}} className="col-1">Пользователь</th>
                    </tr>

                    <tbody>
                    {
                        data.map((item) => (
                            <tr onClick={() => {
                                setEditData(item);
                                setEditModalShow(true);
                            }}>
                                <td>{item.key}</td>
                                <td>{item.name}</td>
                                <td>{item.dateIn}</td>
                                <td>{item.dateOut}</td>
                                <td>{item.createDate}</td>
                                <td>{item.createUser}</td>
                                <td>{item.editDate}</td>
                                <td>{item.editUser}</td>
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

export default Rstr;