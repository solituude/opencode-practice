import React, {useState} from "react";
import s from './header.module.scss';
import {Avatar, Button, Drawer, Box} from "@mui/material";
import {Col, Row, DropdownButton, Dropdown} from "react-bootstrap";

import exitIcon from '../../img/exitIcon.svg';
import menuIcon from '../../img/menuIcon.svg';
import {NavLink} from "react-router-dom";

const userData = {
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович"
}

const Header = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    }

    return (
        <Row className={s.container}>
            <Col className={s.main__container} xs={10}>
                <Button
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(true)}>
                    <img src={menuIcon} alt="menu"/>
                </Button>

                <Drawer
                    anchor="left"
                    variant="temporary"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}>
                    <Box className={s.menu}>
                        <NavLink to='/import'>Импорт</NavLink>
                        <NavLink to='/directories/accountStatus'>Статус счета</NavLink>
                    </Box>
                </Drawer>

            </Col>
            <Col className={s.exit__btn__area}>
                <Dropdown >
                    <Dropdown.Toggle className={s.dropdown__toggle}>
                        <Avatar className={s.avatar} sx={{bgcolor: "#ECECF8", color: "#686794"}}>
                            {userData.name[0]}{userData.surname[0]}
                        </Avatar>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={s.dropdown__menu}>
                        <Dropdown.ItemText>{userData.surname} {userData.name} {userData.patronymic}</Dropdown.ItemText>

                        <Dropdown.Item href="#" className={s.dropdown__item}>
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