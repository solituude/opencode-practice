import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import s from './filesbase.module.scss';

import closeIcon from '../../img/closeIcon.svg';
import searchIcon from '../../img/searchIcon.svg';
import cleanIcon from '../../img/cleanIcon.svg';

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
                            <img onClick={() => setName("")} src={closeIcon} alt="очистить"/>
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
                            {/*<img src={closeIcon}*/}
                            {/*     onClick={() => setDateStart("")}*/}
                            {/*     alt="Очистить"/>*/}
                        </div>
                    </label>

                    <label className={s.date__search}>
                        по
                        <div className={s.date__search__textarea}>
                            <input type="date"
                                   onChange={handleSetDateEnd}
                                   className={s.textarea}/>
                            {/*<img src={closeIcon} alt="Очистить"/>*/}
                        </div>
                    </label>

                    <button className={s.search__btn}>
                        <img src={searchIcon} alt="поиск"/>
                    </button>
                    {/*<button className={s.search__btn}>*/}
                    {/*    <img src={cleanIcon} alt="очистить"/>*/}
                    {/*</button>*/}
                </Col>
            </Row>
        </Row>
    );
}

export default FilesBase;
