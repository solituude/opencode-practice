import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import {useNavigate, useParams} from "react-router-dom";
import {CloseButton, Col, Container, Row} from "react-bootstrap";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import searchIcon from "../../img/searchIcon.svg";
import s from './bic.module.scss';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Loader from "../UI/loader";
import {message} from "antd";
import {deepPurple} from "@mui/material/colors";
import ExpandedTable from "./ExpandedTable";
import PaginationFilter from "../UI/PaginationFilter";
import Pagination from "../UI/Pagination";


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


    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();
    const {id} = useParams();

    const username = 'user';
    const password = 'password';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers.append('Content-Type', 'application/json');

    const goBack = () => {
        navigate(-1);
    };

    let getData = async (page) => {
        if (page >= 1) {
            try {
                let response = await fetch(`/api/bics/payers?msgId=${id}&page=${page - 1}`, {
                    method: 'GET',
                    headers: headers
                });

                let data = await response.json();
                console.log('DATA:', data.content);
                setDataBIC(data.content);
                setIsLoading(false);
            } catch (e) {
                console.log(e.message);
            }
        }
    }


    const getCount = async () => {
        try {
            let response = await fetch(`/api/bics/count?msgId=${id}`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            setCount(data)
        } catch (e) {
            console.log(e.message);
        }
    }


    useEffect(() => {
        getData(page);
    }, []);

    const [count, setCount] = useState(getCount);
    const [[key, isTableOpen], setIsTableOpen] = useState([undefined, false]);
    const [accounts, setAccounts] = useState([]);

    const [rstrList, setRstrList] = useState({});
    const [swbics, setSwbics] = useState([]);

    const [isShowFilter, setIsShowFilter] = useState(false);

    const handleOpenSubTable = (payerId) => {
        getAccounts(payerId)
            .then(accounts => {
                setAccounts(accounts);
                setIsTableOpen([payerId, !isTableOpen]);
                setIsLoading(false);
            })
            .catch(e => console.log(e.message));
        getRstrList(payerId)
            .then(rstrList => {
                console.log("rstrList", rstrList)
                setRstrList(rstrList);
            })
            .catch(e => console.log(e.message));
        getSWBICS(payerId)
            .then(swbic => {
                setSwbics(swbic);
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
            console.log('accounts:', data);
            return data;
        } catch (e) {
            console.log(e.message);
        }
    }

    const getRstrList = async (ID) => {
        try {
            let response = await fetch(`/api/rstrList?id=${ID}`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.text();
            return data.length === 0 ? {} : JSON.parse(data);
        } catch (e) {
            console.log(e.message);
        }

    }

    const getSWBICS = async (ID) => {
        try {
            let response = await fetch(`/api/swbics?id=${ID}`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            console.log('swbics:', data);
            return data;
        } catch (e) {
            console.log(e.message);
        }
    }

    const [pageFilter, setPageFilter] = useState(1);
    const [totalElementsFilter, setTotalElementsFilter] = useState(0);
    const [totalPagesFilter, setTotalPagesFilter] = useState(0);
    const [parameters, setParameters] = useState({});

    const handleSearch = async (params, page) => {
        if (page >= 1) {
            try {
                let response = await fetch(`/api/bics/filter?page=${page-1}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(params)
                });
                let data = await response.json();
                console.log('DATA FROM SEARCH', data);
                setParameters(params)
                setTotalElementsFilter(data.totalElements);
                setTotalPagesFilter(data.totalPages);
                setDataBIC(data.content);
                setIsShowFilter(true);
            } catch (error) {
                console.log(error.message);
            }
        }

    }

    const showAllBICs = () => {
        setIsShowFilter(false);
        setName('');
        setBIC('');
        setType('');
        getData(1);
    }

    return (
        <>
            {contextHolder}
            {isLoading ? (
                    <Loader isLoading={isLoading}/>
                ) :
                (<Container className={s.container} fluid>
                    <Row className={s.return__back}>

                        {
                            isShowFilter ? (<button className={s.return__back__btn} onClick={() => showAllBICs()}>
                                <ArrowBackRoundedIcon/>
                                Назад ко всем записям
                            </button>) : <button className={s.return__back__btn} onClick={goBack}>
                                <ArrowBackRoundedIcon/>
                                Назад к Импорту
                            </button>
                        }
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
                                let params = {};
                                if (BIC.length !== 0) {
                                    params.bic = BIC;
                                    params.msgId = Number(id);
                                }
                                if (name.length !== 0) {
                                    params.nameP = name;
                                    params.msgId = Number(id);
                                }
                                if (type.length !== 0) {
                                    params.ptType = type;
                                    params.msgId = Number(id);
                                }
                                console.log(params)

                                Object.entries(params).length === 0 ? message.info(`Введите значение для поиска`) :
                                    handleSearch(params, 1);
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
                                                <AddRoundedIcon sx={{color: deepPurple[900]}}/></td>
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
                                            isTableOpen && key === item.payerId ? (
                                                <tr>
                                                    <td style={{backgroundColor: "#EDF3F8"}} colSpan={19}>
                                                        <ExpandedTable headers={headers}
                                                                       accounts={accounts}
                                                                       rstrList={rstrList}
                                                                       swbics={swbics}
                                                                       bic={item.bic}/>
                                                    </td>
                                                </tr>) : null
                                        }
                                    </>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Row>
                    {
                        isShowFilter ? (
                            <PaginationFilter page={pageFilter}
                                              setPage={setPageFilter}
                                              getData={handleSearch}
                                              totalElements={totalElementsFilter}
                                              totalPages={totalPagesFilter}
                                              params={parameters}/>
                        ) : (<Pagination page={page} setPage={setPage} getData={getData} totalElements={count}/>)

                    }
                </Container>)
            }
        </>
    );
}

export default BIC;