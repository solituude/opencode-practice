import React, { useState } from "react";
import {CloseButton, Col, Row, Table} from "react-bootstrap";
import s from './filesbase.module.scss';

import searchIcon from '../../../img/searchIcon.svg';


const FilesBase = () => {
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const handleSetDateStart = (event) => {
        setDateStart(event.target.value.toString());
        console.log(event.target.value.toString());
    }

    const handleSetDateEnd = (event) => {
        setDateEnd(event.target.value.toString());
        console.log(event.target.value.toString());
    }

    const handleSetName = (event) => {
        setName(event.target.value.toString());
        console.log(event.target.value.toString());
    }

    const nameColumns = [
        "№",
        "Наименование",
        "Дата создания",
        "Файл",
        "Дата составления ЭС",
        "ID составления ЭС",
        "ID получения ЭС",
        "Код причины создания",
        "Дата создания ЭС",
        "Вид представления...",
        "Дата ОД",
        "Номер версии справ..",
        "Признак сопоставления",
        "Пользователь"
    ]

    return (
        <Row className={s.container}>
            <Row className={s.searches__container}>
                <Col xs={5}>
                    <label className={s.name__search}>
                        Наименование:
                        <div className={s.name__search__textarea}>
                            <input type="text"
                                   value={name}
                                   onChange={handleSetName}
                                   className={s.textarea}/>
                            <CloseButton onClick={() => setName("")}/>
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
                                   className={s.textarea}/>
                        </div>
                    </label>

                    <label className={s.date__search}>
                        по
                        <div className={s.date__search__textarea}>
                            <input type="date"
                                   onChange={handleSetDateEnd}
                                   className={s.textarea}/>
                        </div>
                    </label>

                    <button className={s.search__btn}>
                        <img src={searchIcon} alt="поиск"/>
                    </button>
                </Col>
            </Row>
            <Row>

            </Row>
            <Row>
                <Table className={s.file__table}>
                    <thead>
                        {nameColumns.map((item) => (
                            <th className={s.file__table__col}>{item}</th>
                        ))}
                    </thead>
                </Table>
            </Row>
        </Row>
    );
}

export default FilesBase;
