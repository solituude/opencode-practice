import React from "react";
import s from './header.module.scss';
import {Avatar} from "@mui/material";
import {Col, Row, Dropdown} from "react-bootstrap";
import exitIcon from '../../img/exitIcon.svg';
import Menu from "../Menu/Menu";
import {useLocation} from "react-router-dom";

const userData = {
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович"
}

const renderPathname = (location) => {
    switch (location){
        case '/directories/creationReason':
            return <p className={s.pathname}>Справочник. Причина создания ЭС</p>
        case '/directories/infoTypeCode':
            return <p className={s.pathname}>Справочник. Вид представления информации</p>
        case "/directories/changeType":
            return <p className={s.pathname}>Справочник. Тип изменения в справочнике</p>
        case "/directories/ptType":
            return <p className={s.pathname}>Справочник. Тип участника перевода</p>
        case "/directories/srvcs":
            return <p className={s.pathname}>Справочник. Доступные сервисы перевода денежных средств</p>
        case "/directories/xchType":
            return <p className={s.pathname}>Справочник. Участник обмена</p>
        case "/directories/rstr":
            return <p className={s.pathname}>Справочник. Ограничения сервисов перевода денежных средств</p>
        case "/directories/participantStatus":
            return <p className={s.pathname}>Справочник. Статус участника</p>
        case "/directories/accRstr":
            return <p className={s.pathname}>Справочник. Ограничения операций по счету</p>
        case "/directories/accountStatus":
            return <p className={s.pathname}>Справочник. Статус счета</p>
        case "/directories/regulationAccountType":
            return <p className={s.pathname}>Справочник. Тип счета в соответствии с нормативом</p>
        case '/ed807':
            return <p className={s.pathname}>Импорт</p>
        default:
            return <p className={s.pathname}>Импорт. БИК</p>
    }
}

const Header = () => {
    const location = useLocation().pathname;

    return (
        <Row className={s.container}>
            <Col className={s.main__container} xs={10}>
                <Menu/>
                {renderPathname(location)}
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