import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import {useNavigate, useParams} from "react-router-dom";
import {CloseButton, Col, Container, Row} from "react-bootstrap";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import searchIcon from "../../img/searchIcon.svg";
import s from './bic.module.scss';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Loader from "../UI/loader";
import {message} from "antd";
import {deepPurple, purple} from "@mui/material/colors";


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

    const [page, setPage] = useState(1);

    const [lastElem, setLastElem] = useState(0);

    const navigate = useNavigate();
    const {id} = useParams();
    const countBicPerPage = 25;

    const username = 'user';
    const password = 'password';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    const goBack = () => {
        navigate(-1);
    };

    let getData = async (lastElement) => {
        try {
            let response = await fetch(`/api/bics/payers?msgId=${id}&bicId=${lastElement}`, {
                method: 'GET',
                headers: headers
            });

            let data = await response.json();
            console.log('DATA:', data);
            setDataBIC(data);
            setLastElem(data[data.length - 1].payerId);
            console.log(lastElem)
            setIsLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    }


    const getCount = async () => {
        try{
            let response = await fetch(`/api/bics/count?msgId=${id}`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            console.log(typeof(data));
            setCount(data)
        } catch (e) {
            console.log(e.message);
        }
    }

    const [count, setCount] = useState(getCount);


    useEffect(() => {
        getData(lastElem);
        // console.log(lastElem);
    }, []);


    const columnsAccount = [
        {title: "№",},
        {title: "Номер счета",},
        {title: "Тип счета",},
        {title: "БИК ПБР",},
        {title: "Контрольный ключ",},
        {title: "Дата открытия счета",},
        {title: "Дата исключения информации о счете",},
        {title: "Статус счета",},
    ];

    const [[key, isTableOpen], setIsTableOpen] = useState([undefined, false]);
    const [accounts, setAccounts] = useState([]);

    const handleOpenSubTable = (payerId) => {
        // setIsTableOpen(false);
        getAccounts(payerId)
            .then(accounts => {
                setAccounts(accounts);
                setIsTableOpen([payerId, !isTableOpen]);
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

    const handleSearch = async (url) => {
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            console.log(url);
            let data = await response.json();
            console.log('DATA FROM SEARCH', data);
            setDataBIC(data);
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <>
            {isLoading ? (
                    <Loader isLoading={isLoading}/>
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
                            <button className={s.search__btn} onClick={() => {
                                let isOnly = true;
                                let url = '/api/bics/filter?';
                                if (BIC.length !== 0) {
                                    url += `bic=${BIC}`;
                                    isOnly = false;
                                }
                                if (name.length !== 0) {
                                    isOnly ? (url += `nameP=${name}`) : (url += `&nameP=${name}`);
                                    isOnly = false;
                                }
                                if (type.length !== 0) {
                                    isOnly ? (url += `ptType=${type}`) : (url += `&ptType=${type}`);
                                }
                                url === '/api/bics/filter?' ? message.info(`Введите значение для поиска`) : handleSearch(url + `&msgId=${id}`);
                            }}>
                                <img src={searchIcon} alt="поиск"/>
                            </button>
                        </Col>
                    </Row>

                    <Row className={s.file__content} xs={12}>
                        <Table className={s.file__table} bordered hover>
                            <thead>
                            <tr>
                                {nameColumns.map((item, index) => <th>{item.title}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                dataBIC.map((item, index) => (
                                    <>
                                        <tr onClick={() => handleOpenSubTable(item.payerId)}>
                                            <td onClick={() => handleOpenSubTable(item.payerId)}>
                                                <AddRoundedIcon sx={{ color: deepPurple[900]}}/></td>
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

                    <Row className={s.pagination}>

                        {
                            page === 1 ? (null) : (
                                <button className={s.pagination__btn} onClick={() => {
                                    setLastElem(lastElem - countBicPerPage)
                                    setPage(page - 1);
                                    getData(lastElem - countBicPerPage * 2);
                                }}>
                                    <ArrowBackRoundedIcon/>
                                </button>
                            )
                        }

                        <span className={s.pagination__text}>Страница</span>
                        <input className={s.pagination__input} value={page}
                               onChange={(e) => {
                                   setPage(Number(e.target.value))
                                   getData((e.target.value - page - 2) * 25 + lastElem);
                               }}/>
                        <span className={s.pagination__text}>
                            из {Math.floor(count / countBicPerPage) + 1}
                        </span>
                        {
                            page === (Math.floor(count / countBicPerPage) + 1) ? (null) : (
                                <button className={s.pagination__btn} onClick={() => {
                                    setPage(page + 1);
                                    getData(lastElem);
                                }}>
                                    <ArrowForwardRoundedIcon/>
                                </button>
                            )
                        }

                        <span className={s.pagination__text2} style={{right: 0}}>
                            Всего записей {count}
                        </span>
                    </Row>

                </Container>)
            }
        </>
    );
}

export default BIC;