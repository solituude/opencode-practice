import React, {useState, useContext, useEffect, useRef} from "react";
// import {CloseButton, Col, Row, Table, Container} from "react-bootstrap";
import s from './database.module.scss';
import searchIcon from '../../img/searchIcon.svg';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {CloseButton, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

function createData(IdED, BIC, NameP, CntrCd, Rgn, Ind, Tnp, Nnp, Adr, PrntBIC, DateIn, DateOut, PtType, Srvcs, XchType,
                    ID, ParticipantStatus) {
    return {
        IdED, BIC, NameP, CntrCd, Rgn, Ind, Tnp, Nnp, Adr, PrntBIC, DateIn, DateOut, PtType, Srvcs, XchType,
        ID, ParticipantStatus,
        Accounts: [
            {
                "Account": "40116810100000010010",
                "RegulationAccountType": "TRSA",
                "CK": "99",
                "AccountCBRBIC": "041280002",
                "DateIn": "2013-01-09",
                "AccountStatus": "ACAC"
            },
            {
                "Account": "40116810400000010011",
                "RegulationAccountType": "TRSA",
                "CK": "99",
                "AccountCBRBIC": "041280002",
                "DateIn": "2013-01-09",
                "AccountStatus": "ACAC"
            },
            {
                "Account": "40116810700000010012",
                "RegulationAccountType": "TRSA",
                "CK": "99",
                "AccountCBRBIC": "041280002",
                "DateIn": "2013-01-09",
                "AccountStatus": "ACAC"
            }]
    };
}

function RowH(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={12}>
                <TableCell className={s.tr}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>

                <TableCell className={s.tr} align="center">{row.IdED}</TableCell>
                <TableCell className={s.tr} align="center">{row.BIC}</TableCell>
                <TableCell className={s.tr} align="center">{row.NameP}</TableCell>
                <TableCell className={s.tr} align="center">{row.CntrCd}</TableCell>
                <TableCell className={s.tr} align="center">{row.Rgn}</TableCell>
                <TableCell className={s.tr} align="center">{row.Ind}</TableCell>
                <TableCell className={s.tr} align="center">{row.Tnp}</TableCell>
                <TableCell className={s.tr} align="center">{row.Nnp}</TableCell>
                <TableCell className={s.tr} align="center">{row.Adr}</TableCell>
                <TableCell className={s.tr} align="center">{row.PrntBIC}</TableCell>
                <TableCell className={s.tr} align="center">{row.DateIn}</TableCell>
                <TableCell className={s.tr} align="center">{row.DateOut}</TableCell>
                <TableCell className={s.tr} align="center">{row.PtType}</TableCell>
                <TableCell className={s.tr} align="center">{row.Srvcs}</TableCell>
                <TableCell className={s.tr} align="center">{row.XchType}</TableCell>
                <TableCell className={s.tr} align="center">{row.ID}</TableCell>
                <TableCell className={s.tr} align="center">{row.ParticipantStatus}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={18}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Typography variant="h6" gutterBottom component="div">
                                Accounts
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Account</TableCell>
                                        <TableCell>RegulationAccountType</TableCell>
                                        <TableCell align="center">CK</TableCell>
                                        <TableCell align="center">AccountCBRBIC</TableCell>
                                        <TableCell align="center">DateIn</TableCell>
                                        <TableCell align="center">AccountStatus</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Accounts.map((accRow) => (
                                        <TableRow key={accRow.date}>
                                            <TableCell component="th" scope="row">
                                                {accRow.Account}
                                            </TableCell>
                                            <TableCell>{accRow.RegulationAccountType}</TableCell>
                                            <TableCell align="right">{accRow.CK}</TableCell>
                                            <TableCell align="right">{accRow.AccountCBRBIC}</TableCell>
                                            <TableCell align="right">{accRow.DateIn}</TableCell>
                                            <TableCell align="right">{accRow.AccountStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData(5, "041280103", "УФК по Астраханской области", "RU", "12", "414056",
        "г", "Астрахань", "ул Латышева, 6 Г", "52", "2010-06-08", "", "52", "3", "1", "1280002005", "PSAC"),
    createData(5, "041280103", "УФК по Астраханской области", "RU", "12", "414056",
        "г", "Астрахань", "ул Латышева, 6 Г", "52", "2010-06-08", "", "52", "3", "1", "1280002005", "PSAC"),
];

const nameColumns = [
        {name: "№",},
        {name: "ID ЭС",},
        {name: "БИК",},
        // {name: "Информация об участнике",},
        {name: "Наименование участника",},
        // {name: "Рег. порядковый номер",},
        {name: "Код страны",},
        {name: "Код территории",},
        {name: "Индекс",},
        {name: "Тип нас. пункта",},
        {name: "Населенный пункт",},
        {name: "Адрес",},
        {name: "БИК голов. организации",},
        {name: "Дата включения",},
        {name: "Дата исключения",},
        {name: "Тип участника",},
        {name: "Доступные серв. перевода",},
        {name: "Участник обмена",},
        {name: "УИС",},
        {name: "Статус участника",},
];

export default function CollapsibleTable() {
    // по айдишнику урла получать информацию которая будет в таблице ???

    const {id} = useParams();

    const [name, setName] = useState("");
    const [BIC, setBIC] = useState("");
    const [type, setType] = useState("");

    const handleSetBIC = (event) => {
        setBIC(event.target.value);
    }

    const handleSetName = (event) => {
        setName(event.target.value);
    }

    const handleSetType = (event) => {
        setType(event.target.value);
    }

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <Container className={s.container} fluid>
            <Row className={s.return__back}>
                <button className={s.return__back__btn} onClick={goBack}>
                    <ArrowBackRoundedIcon/>
                    Назад
                </button>
            </Row>

            <Row className={s.searches__container} xs={4}>
                <Col xs={4}>
                    <label className={s.name__search}>
                        БИК
                        <div className={s.name__search__textarea}>
                            <input type="text"
                                   value={name}
                                   onChange={handleSetBIC}
                                   className={s.textarea}/>
                            <CloseButton onClick={() => setBIC("")}/>
                        </div>
                    </label>
                </Col>

                <Col xs={4} className={s.date__container}>
                    <label className={s.name__search}>
                        Наим. участника
                        <div className={s.name__search__textarea}>
                            <input type="text"
                                   value={name}
                                   onChange={handleSetName}
                                   className={s.textarea}/>
                            <CloseButton onClick={() => setName("")}/>
                        </div>
                    </label>
                </Col>
                <Col xs={4} className={s.date__container}>
                    <label className={s.name__search}>
                        Тип участника
                        <div className={s.name__search__textarea}>
                            <input type="text"
                                   value={name}
                                   onChange={handleSetType}
                                   className={s.textarea}/>
                            <CloseButton onClick={() => setType("")}/>
                        </div>
                    </label>
                    <button className={s.search__btn}>
                        <img src={searchIcon} alt="поиск" />
                    </button>
                </Col>
            </Row>

            <Row className={s.file__content} xs={12}>
                <TableContainer component={Paper} style={{padding: 0}}>
                    <Table className={s.table__acc} hover>
                        <TableHead>
                            <TableRow>
                                {nameColumns.map(col => (
                                    <TableCell className={s.table__acc__header}>{col.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className={s.table__acc}>
                            {rows.map((row) => (
                                <RowH key={row.name} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                    {id === "6234928932" ? (<div>hi))))</div>) : null}
                </TableContainer>
            </Row>
        </Container>
    );
}
