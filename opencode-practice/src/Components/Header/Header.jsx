import React from "react";
import s from './header.module.scss';
import {Avatar} from "@mui/material";
import {Col, Row, Dropdown} from "react-bootstrap";
import exitIcon from '../../img/exitIcon.svg';
import Menu from "../Menu/Menu";

const userData = {
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович"
}

const Header = () => {
    return (
        <Row className={s.container}>
            <Col className={s.main__container} xs={10}>
                <Menu/>
            </Col>
            <Col className={s.exit__btn__area}>
                <Dropdown>
                    <Dropdown.Toggle className={s.dropdown__toggle}>
                        <Avatar className={s.avatar} sx={{bgcolor: "#ECECF8", color: "#686794"}}>
                            {userData.name[0]}{userData.surname[0]}
                        </Avatar>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={s.dropdown__menu}>
                        <Dropdown.ItemText>{userData.surname} {userData.name} {userData.patronymic}</Dropdown.ItemText>
                            <Dropdown.Item href="/login" className={s.dropdown__item}>
                                Выйти
                                <button className={s.exit__btn}>
                                    <img src={exitIcon} alt="Выход из системы"/>
                                </button>
                            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
}

export default Header;