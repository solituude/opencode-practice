import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import {useNavigate, useParams} from "react-router-dom";
// import s from "../DataBase/bic.module.scss";
import {CloseButton, Col, Container, Row} from "react-bootstrap";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import searchIcon from "../../img/searchIcon.svg";
import s from './bic.module.scss';
import Box from "@mui/material/Box";
import {Fade} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const BIC = () => {
    const nameColumns = [
        {title: "",},
        {title: "№",},
        {title: "ID ЭС",},
        {title: "БИК",},
        {title: "Наименование участника",},
        {title: "Рег. порядковый номер",},
        {title: "Код страны",},
        {title: "Код территории",},
        {title: "Индекс",},
        {title: "Населенный пункт",},
        {title: "Адрес",},
        {title: "БИК голов. организации",},
        {title: "Дата включения",},
        {title: "Дата исключения",},
        {title: "Тип участника",},
        {title: "Доступные серв. перевода",},
        {title: "Участник обмена",},
        {title: "УИС",},
        {title: "Статус участника",},
    ];
    const [name, setName] = useState("");
    const [BIC, setBIC] = useState("");
    const [type, setType] = useState("");

    const [dataBIC, setDataBIC] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const {id} = useParams();

    const username = 'user1';
    const password = 'password1';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    useEffect(() => {
        getData();
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    let getData = async () => {
        try {
            let response = await fetch(`/api/bics?msgId=${id}`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            console.log('DATA:', data);
            setDataBIC(data);
            setIsLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    }


    const columnsAccount = [
        {
            title: "№",
        },
        {
            title: "Номер счета",
        },
        {
            title: "Тип счета",
        },
        {
            title: "БИК ПБР",
        },
        {
            title: "Контрольный ключ",
        },
        {
            title: "Дата открытия счета",
        },
        {
            title: "Дата исключения информации о счете",
        },
        {
            title: "Статус счета",
        },
    ];

    const [[key, isTableOpen], setIsTableOpen] = useState([undefined, false]);
    const [accounts, setAccounts] = useState([]);

    const handleOpenSubTable = (payerId) => {
        // setIsTableOpen(false);
        getAccounts(payerId)
            .then(accounts => {
                setAccounts(accounts);
                setIsTableOpen([payerId, true]);
                setIsLoading(false);
            })
            .catch(e => console.log(e.message));
    }

    const getAccounts = async (payerID) => {
        try {
            let response = await fetch(`/api/accounts?bicId=${payerID}`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            console.log('DATA:', data);
            // setAccounts(data);
            return data;
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>
            {isLoading ? (
                    <Box className={s.loader}>
                        <Fade in={isLoading} exit={isLoading} className={s.loader__item}>
                            <CircularProgress/>
                        </Fade>
                    </Box>
                ) :

                (<Container className={s.container} fluid>
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
                                           value={BIC}
                                           onChange={(e) => setBIC(e.target.value)}
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
                                           onChange={(e) => setName(e.target.value)}
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
                                           value={type}
                                           onChange={(e) => setType(e.target.value)}
                                           className={s.textarea}/>
                                    <CloseButton onClick={() => setType("")}/>
                                </div>
                            </label>
                            <button className={s.search__btn}>
                                <img src={searchIcon} alt="поиск"/>
                            </button>
                        </Col>
                    </Row>

                    <Row className={s.file__content} xs={12}>
                        <Table bordered hover>
                            <thead>
                            <tr>
                                {nameColumns.map((item, index) => <th>{item.title}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                dataBIC.map((item, index) => (
                                    <>
                                        <tr>
                                            <td onClick={() => handleOpenSubTable(item.payerId)}>+</td>
                                            <td>{item.payerId}</td>
                                            <td>{item.msgId}</td>
                                            <td>{item.bic}</td>
                                            <td>{item.nameP}</td>
                                            <td>{item.regN}</td>
                                            <td>{item.cntrCd}</td>
                                            <td>{item.rgn}</td>
                                            <td>{item.ind}</td>
                                            <td>{item.nnp}</td>
                                            <td>{item.adr}</td>
                                            <td>{item.prntBIC}</td>
                                            <td>{item.dateIn}</td>
                                            <td>{item.dateOut}</td>
                                            <td>{item.ptType}</td>
                                            <td>{item.srvcs}</td>
                                            <td>{item.xchType}</td>
                                            <td>{item.uid}</td>
                                            <td>{item.participantStatus}</td>
                                        </tr>
                                        {
                                            isTableOpen && key === item.payerId ? (<tr onClick={() =>
                                                setIsTableOpen([item.payerId, false])}>
                                                <td colSpan={19}>
                                                    {accounts.length === 0 ? (<p>Данные не найдены</p>) : (
                                                        <Table>
                                                            <thead>
                                                            <tr>
                                                                {columnsAccount.map((item, index) => (
                                                                    <th>{item.title}</th>
                                                                ))}
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                accounts.map((item, index) => (
                                                                    <tr>
                                                                        <td>{item.id}</td>
                                                                        <td>{item.account}</td>
                                                                        <td>{item.regulationAccountType}</td>
                                                                        <td>{item.accountCBRBIC}</td>
                                                                        <td>{item.ck}</td>
                                                                        <td>{item.dateIn}</td>
                                                                        <td>{item.dateOut}</td>
                                                                        <td>{item.accountStatus}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                            </tbody>
                                                        </Table>)}
                                                </td>
                                            </tr>) : null
                                        }
                                    </>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Row>
                </Container>)
            }
        </>
    );
}

export default BIC;