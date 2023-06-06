import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import s from './filesbase.module.scss';

import closeIcon from '../../img/closeIcon.svg';
import searchIcon from '../../img/searchIcon.svg';
import cleanIcon from '../../img/cleanIcon.svg';

const FilesBase = () => {

    return (
        <Row className={s.container}>
            <Row className={s.searches__container}>
                <Col xs={5}>
                    <label className={s.name__search}>
                        Наименование:
                        <div className={s.name__search__textarea}>
                            <input className={s.textarea}/>
                            <img src={closeIcon} alt="очистить"/>
                        </div>
                    </label>
                </Col>

                <Col xs={7} className={s.date__container}>
                    <label className={s.date__search}>

                        Дата загрузки с:

                        <div className={s.date__search__textarea}>
                            <input type="date" className={s.textarea}/>
                            <img src={closeIcon} alt="Очистить"/>
                        </div>
                    </label>

                    <label className={s.date__search}>
                        по
                        <div className={s.date__search__textarea}>
                            <input type="date" className={s.textarea}/>
                            <img src={closeIcon} alt="Очистить"/>
                        </div>
                    </label>

                    <button className={s.search__btn}>
                        <img src={searchIcon} alt="поиск"/>
                    </button>
                    <button className={s.search__btn}>
                        <img src={cleanIcon} alt="очистить"/>
                    </button>
                </Col>

            </Row>

        </Row>
    );
}

export default FilesBase;
