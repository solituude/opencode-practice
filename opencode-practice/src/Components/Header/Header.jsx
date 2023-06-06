import React from "react";
import s from './header.module.scss';
import {Avatar} from "@mui/material";
import {Col, Row} from "react-bootstrap";

import exitIcon from '../../img/exitIcon.svg';

const userData = {
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович"
}

const Header = () => {
    return(
        <Row className={s.container}>
            <Col className={s.user__container} xs={11}>
                <Avatar className={s.avatar} sx={{ bgcolor: "#ECECF8", color: "#686794"}}> {userData.name[0]}{userData.surname[0]} </Avatar>

                <h3 className={s.user__info}>
                    {userData.surname} {userData.name} {userData.patronymic}
                </h3>
            </Col>

            <Col>
                <button className={s.exit__btn}>
                    <img src={exitIcon} alt="Выход из системы"/>
                </button>
            </Col>

        </Row>
    );
}

export default Header;