import React, { useState, useContext, useEffect, useRef } from "react";
import { CloseButton, Col, Row, Table, Container } from "react-bootstrap";
import s from './filesbase.module.scss';
import searchIcon from '../../img/searchIcon.svg';
import tempData from '../../data.json';
import {NavLink} from "react-router-dom";

const FilesBase = () => {
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [data, setData] = useState([]);

    const handleSetDateStart = (event) => {
        setDateStart(event.target.value.toString());
        // console.log(event.target.value.toString());
    }

    const handleSetDateEnd = (event) => {
        setDateEnd(event.target.value.toString());
        // console.log(event.target.value.toString());
    }

    const handleSetName = (event) => {
        setName(event.target.value.toString());
        // console.log(event.target.value.toString());
    }

    const nameColumns = [
        {
            name:"№",
        },
        {
            name:"Наименование",
        },
        {
            name:"Дата создания",
        },
        {
            name:"Файл",
        },
        {
            name:"Дата составления ЭС",
        },
        {
            name:"ID составления ЭС",
        },
        {
            name: "ID получателя ЭС",
        },
        {
            name: "Код причины создания",
        },
        {
            name: "Дата создания ЭС",
        },
        {
            name: "Вид представления...",
        },
        {
            name: "Дата ОД",
        },
        {
            name: "Номер версии справ..",
        },
        {
            name: "Признак сопоставления",
        },
        {
            name: "Пользователь",
        },

    ];


    return (
        <Container className={s.container} fluid>
            <Row className={s.searches__container}>
                <Col>
                    <label className={s.name__search}>
                        Наименование:
                        <div className={s.name__search__textarea}>
                            <input type="text"
                                value={name}
                                onChange={handleSetName}
                                className={s.textarea} />
                            <CloseButton onClick={() => setName("")} />
                        </div>
                    </label>
                </Col>

                <Col xs={7} className={s.date__container}>
                    <label className={s.date__search}>
                        Дата загрузки с:
                        <div className={s.date__search__textarea}>
                            <input type="date"
                                defaultValue=""
                                onChange={handleSetDateStart}
                                className={s.textarea} />
                        </div>
                    </label>

                    <label className={s.date__search}>
                        по
                        <div className={s.date__search__textarea}>
                            <input type="date"
                                onChange={handleSetDateEnd}
                                className={s.textarea} />
                        </div>
                    </label>

                    <button className={s.search__btn}>
                        <img src={searchIcon} alt="поиск" />
                    </button>
                </Col>
            </Row>

            <Row className={s.file__content} xs={12}>
                <Table className={s.file__table}>
                    <thead>
                        {nameColumns.map((item) => (
                            <th className={s.file__table__col}>{item.name}</th>
                        ))}
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>file345678.xlmns</td>
                            <td>23-05-2023</td>
                            <td><NavLink to='/bics'>file345678.xlmns</NavLink></td>
                            <td>04-05-2023</td>
                            <td>6234928932</td>
                            <td></td>
                            <td>FCBD</td>
                            <td>04-05-2023</td>
                            <td>FIRR</td>
                            <td>23-05-2023</td>
                            <td>1</td>
                            <td></td>
                            <td>денис</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default FilesBase;
