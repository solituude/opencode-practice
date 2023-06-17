import React, {useState, useContext, useEffect, useRef} from "react";
// import {CloseButton, Col, Row, Table, Container} from "react-bootstrap";
import s from './database.module.scss';
import searchIcon from '../../img/searchIcon.svg';
import {NavLink} from "react-router-dom";


import PropTypes from 'prop-types';
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
import {CloseButton, Col, Container, Row} from "react-bootstrap";

// const FilesBase = () => {
//     const [name, setName] = useState("");
//     const [BIC, setBIC] = useState("");
//     const [type, setType] = useState("");
//     // const [data, setData] = useState([]);
//
//     const handleSetBIC = (event) => {
//         setBIC(event.target.value);
//     }
//
//     const handleSetName = (event) => {
//         setName(event.target.value);
//     }
//
//     const handleSetType = (event) => {
//         setType(event.target.value);
//     }
//
//
//     const nameColumns = [
//         {name: "№",},
//         {name: "ID ЭС",},
//         {name: "БИК",},
//         {name: "Информация об участнике",},
//         {name: "Наименование участника",},
//         {name: "Рег. порядковый номер",},
//         {name: "Код страны",},
//         {name: "Код территории",},
//         {name: "Индекс",},
//         {name: "Тип нас. пункта",},
//         {name: "Населенный пункт",},
//         {name: "Адрес",},
//         {name: "БИК голов. организации",},
//         {name: "Дата включения",},
//         {name: "Дата исключения",},
//         {name: "Тип участника",},
//         {name: "Доступные серв. перевода",},
//         {name: "Участник обмена",},
//         {name: "УИС",},
//         {name: "Статус участника",},
//
//     ];


//     return (
//         <Container className={s.container} fluid>
//             <Row className={s.searches__container} xs={4}>
//                 <Col>
//                     <label className={s.name__search}>
//                         БИК
//                         <div className={s.name__search__textarea}>
//                             <input type="text"
//                                    value={name}
//                                    onChange={handleSetBIC}
//                                    className={s.textarea}/>
//                             <CloseButton onClick={() => setBIC("")}/>
//                         </div>
//                     </label>
//                 </Col>
//
//                 <Col xs={4} className={s.date__container}>
//                     <label className={s.name__search}>
//                         Наим. участника
//                         <div className={s.name__search__textarea}>
//                             <input type="text"
//                                    value={name}
//                                    onChange={handleSetName}
//                                    className={s.textarea}/>
//                             <CloseButton onClick={() => setName("")}/>
//                         </div>
//                     </label>
//                 </Col>
//                 <Col xs={4} className={s.date__container}>
//                     <label className={s.name__search}>
//                         Тип участника
//                         <div className={s.name__search__textarea}>
//                             <input type="text"
//                                    value={name}
//                                    onChange={handleSetType}
//                                    className={s.textarea}/>
//                             <CloseButton onClick={() => setType("")}/>
//                         </div>
//                     </label>
//                 </Col>
//             </Row>
//
//             <Row className={s.file__content} xs={12}>
//                 <Table className={s.file__table}>
//                     <thead>
//                         <th>(+)</th>
//                     {nameColumns.map((item) => (
//                         <th className={s.file__table__col}>{item.name}</th>
//                     ))}
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>
//                             <button>+</button>
//                         </td>
//                         <td>1</td>
//                         <td>5</td>
//                         <td>41280103</td>
//                         <td>6851</td>
//                         <td>УФК по Астраханской области</td>
//                         <td></td>
//                         <td>RU</td>
//                         <td>12</td>
//                         <td>414056</td>
//                         <td>г</td>
//                         <td>Астрахань</td>
//                         <td>ул Латышева 6г</td>
//                         <td></td>
//                         <td>08.06.2010</td>
//                         <td></td>
//                         <td>52</td>
//                         <td>3</td>
//                         <td>1</td>
//                         <td>1280002005</td>
//                         <td>PSAC</td>
//                     </tr>
//                     </tbody>
//                 </Table>
//             </Row>
//         </Container>
//     );
// }
//
// export default FilesBase;

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
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>

                <TableCell align="right">{row.IdED}</TableCell>
                <TableCell align="right">{row.BIC}</TableCell>
                <TableCell align="right">{row.NameP}</TableCell>
                <TableCell align="right">{row.CntrCd}</TableCell>
                <TableCell align="right">{row.Rgn}</TableCell>
                <TableCell align="right">{row.Ind}</TableCell>
                <TableCell align="right">{row.Tnp}</TableCell>
                <TableCell align="right">{row.Nnp}</TableCell>
                <TableCell align="right">{row.Adr}</TableCell>
                <TableCell align="right">{row.PrntBIC}</TableCell>
                <TableCell align="right">{row.DateIn}</TableCell>
                <TableCell align="right">{row.DateOut}</TableCell>
                <TableCell align="right">{row.PtType}</TableCell>
                <TableCell align="right">{row.Srvcs}</TableCell>
                <TableCell align="right">{row.XchType}</TableCell>
                <TableCell align="right">{row.ID}</TableCell>
                <TableCell align="right">{row.ParticipantStatus}</TableCell>
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
                                        <TableCell align="right">CK</TableCell>
                                        <TableCell align="right">AccountCBRBIC</TableCell>
                                        <TableCell align="right">DateIn</TableCell>
                                        <TableCell align="right">AccountStatus</TableCell>
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
    const [name, setName] = useState("");
    const [BIC, setBIC] = useState("");
    const [type, setType] = useState("");
    // const [data, setData] = useState([]);

    const handleSetBIC = (event) => {
        setBIC(event.target.value);
    }

    const handleSetName = (event) => {
        setName(event.target.value);
    }

    const handleSetType = (event) => {
        setType(event.target.value);
    }
    return (
        <Container className={s.container} fluid>
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
                <TableContainer component={Paper}>
                    <Table className={s.table__acc}>
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
                </TableContainer>
            </Row>
        </Container>
    );
}
