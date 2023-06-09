import React, {useState} from "react";
import {
    Box,
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import menuIcon from "../../img/menuIcon.svg";
import downloadIcon from "../../img/downloadIcon.svg";
import folderOpenIcon from "../../img/folderOpen.svg";
import folderCloseIcon from "../../img/folderClose.svg";
import s from "../Header/header.module.scss";
import {NavLink} from "react-router-dom";

const Menu = () => {
    const directories = [
        {
            url: "/directories/creationReason",
            nameDir: "Причина создания ЭС",
        },
        {
            url: "/directories/infoTypeCode",
            nameDir: "Вид представления информации",
        },
        {
            url: "/directories/changeType",
            nameDir: "Тип изменения в справочнике",
        },
        {
            url: "/directories/ptType",
            nameDir: "Тип участника перевода",
        },
        {
            url: "/directories/srvcs",
            nameDir: "Доступные сервисы перевода денежных средств",
        },
        {url: "/directories/xchType", nameDir: "Участник обмена"},
        {
            url: "/directories/rstr",
            nameDir: "Ограничения сервисов перевода денежных средств",
        },
        {url: "/directories/participantStatus", nameDir: "Статус участника"},
        {
            url: "/directories/accRstr",
            nameDir: "Ограничения операций по счету",
        },
        {url: "/directories/accountStatus", nameDir: "Статус счета"},
        {
            url: "/directories/regulationAccountType",
            nameDir: "Тип счета в соответствии с нормативом",
        },
    ];

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenDir, setIsOpenDir] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsOpenMenu(open);
    };

    const handleClick = () => {
        setIsOpenDir(!isOpenDir);
    };


    return (
        <>
            <Button edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(true)}>
                <img src={menuIcon} alt="menu"/>
            </Button>

            <Drawer anchor="left"
                    variant="temporary"
                    open={isOpenMenu}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}>
                <Box className={s.menu}>
                    <List sx={{width: 360}} component="nav" subheader={
                        <ListSubheader component="div">
                            Меню
                        </ListSubheader>}>
                        <NavLink to="/ed807" style={{textDecoration: 'none', color: '#303752'}}>
                            <ListItemButton onClick={() => setIsOpenMenu(false)}>
                                <ListItemIcon>
                                    <img src={downloadIcon} alt="import"/>
                                </ListItemIcon>
                                Импорт
                            </ListItemButton>
                        </NavLink>


                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                {isOpenDir ? <img src={folderOpenIcon} alt="open folder"/> :
                                    <img src={folderCloseIcon} alt="close folder"/>}
                            </ListItemIcon>
                            <ListItemText primary="Справочники"/>
                            {isOpenDir ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={isOpenDir} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {directories.map((dir) => (
                                    <NavLink to={dir.url} onClick={() => setIsOpenMenu(false)}
                                             style={{textDecoration: 'none', color: '#303752'}}>
                                        <ListItemButton sx={{pl: 6}}>
                                            {dir.nameDir}
                                        </ListItemButton>
                                    </NavLink>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Menu;
