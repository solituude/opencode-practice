import React, {useState, useEffect} from "react";
import {CloseButton, Col, Row, Table, Container} from "react-bootstrap";
import s from './import.module.scss';
import searchIcon from '../../img/searchIcon.svg';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import {NavLink} from "react-router-dom";
import Loader from "../UI/loader";
import {message} from "antd";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ModalImport from "./ModalImport";

import Form from 'react-bootstrap/Form';
import PaginationFilter from "../UI/PaginationFilter";



const Import = () => {
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [data, setData] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    const username = 'user';
    const password = 'password';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers.append('Content-Type', 'application/json');

    useEffect(() => {
        getData();
    }, [])

    const cleanFields = () => {
        setName("");
    }

    const nameColumns = [
        {name: "№",},
        {name: "Наименование",},
        {name: "Дата создания",},
        {name: "Файл",},
        {name: "Дата составления ЭС",},
        {name: "ID составления ЭС",},
        {name: "ID получателя ЭС",},
        {name: "Код причины создания",},
        {name: "Дата создания ЭС",},
        {name: "Вид представления...",},
        {name: "Дата ОД",},
        {name: "Номер версии справ..",},
        {name: "Признак сопоставления",},
        {name: "Пользователь",},

    ];

    const handleDelete = async (ID, title) => {
        try {
            let response = await fetch(`/api/ed807/${ID}`, {
                method: 'DELETE',
                headers: headers
            })
            setIsLoading(true);
            console.log('Ответ сервера:', response);
            getData();
            response.ok ? message.info(`Файл ${title} успешно удалён`) :
                message.info(`Ошибка в удалении файла`)
            // message.info(`Файл ${title} успешно удалён`)
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const handleUpdate = async (ID, title) => {
        try {
            let response = await fetch(`/api/ed807/${ID}`, {
                method: 'PATCH',
                headers: headers
            })
            setIsLoading(true);
            console.log('Ответ сервера:', response);
            getData();
            response.ok ? message.info(`Файл ${title} успешно обновлён`) :
                message.info(`Ошибка в обновлении файла`)
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const [isShowFilter, setIsShowFilter] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [parameters, setParameters] = useState({});

    const handleSearch = async (params, page) => {
        if (page >= 1) {
            try {
                params.deleted = showDeleted;
                let response = await fetch(`/api/ed807/filter?page=${page - 1}`, { //сделать нормально
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(params)
                });
                console.log(params)
                let data = await response.json();
                console.log('DATA FROM SEARCH', data.content);
                setIsShowFilter(true);
                setParameters(params)
                setTotalElements(data.totalElements);
                setTotalPages(data.totalPages);
                setData(data.content);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const showAllFiles = () => {
        setIsShowFilter(false);
        setIsLoading(true);
        setName("");
        getData();
    }

    const [visibleButton, setVisibleButton] = useState(true);

    const handleActualization = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/ed807/actualization', {
                method: 'GET',
                headers: headers
            });
            setVisibleButton(false);
            getData();
            setTimeout(() => {
                setVisibleButton(true); // Показать кнопку через 10 секунд
            }, 1000);
        } catch (error) {
            console.log(error.message);
        }
    }

    const [showModal, setShowModal] = useState(false);

    let getData = async () => {
        try {
            let response = await fetch(`/api/ed807`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>{!isLoading ? (
            <>
                {contextHolder}
                <Container className={s.container} fluid>
                    {
                        isShowFilter ?
                            <Row className={s.return}>
                                <button className={s.action__field__btn} onClick={showAllFiles}>
                                    <ArrowBackRoundedIcon/>
                                    Назад ко всем записям
                                </button>
                            </Row> : <Row className={s.return}></Row>
                    }
                    <Row className={s.searches__container1}>
                        <Col>
                            <label className={s.name__search}>
                                Наименование:
                                <div className={s.name__search__textarea}>
                                    <input type="text"
                                           value={name}
                                           onChange={(event) => setName(event.target.value)}
                                           className={s.textarea}/>
                                    <CloseButton onClick={() => setName("")}/>
                                </div>
                            </label>
                        </Col>

                        <Col xs={7} className={s.date__container}>
                            <label className={s.date__search}>
                                Дата загрузки с:
                                <div className={s.date__search__textarea}>
                                    <input type="date"
                                           onChange={(event) => setDateStart(event.target.value)}
                                           className={s.textarea}/>
                                </div>
                            </label>

                            <label className={s.date__search}>
                                по
                                <div className={s.date__search__textarea}>
                                    <input type="date"
                                           onChange={(event) => setDateEnd(event.target.value)}
                                           className={s.textarea}/>
                                </div>
                            </label>

                            <button className={s.search__btn} onClick={() => {
                                let params = {};
                                if (name.length !== 0) {
                                    params.title = name;
                                }
                                if (dateStart.length !== 0) {
                                    params.date1 = dateStart;
                                }
                                if (dateEnd.length !== 0) {
                                    params.date2 = dateEnd;
                                }
                                Object.entries(params).length === 0 ? message.info(`Введите значение для поиска`)
                                    : handleSearch(params, 1);
                            }}>
                                <img src={searchIcon} alt="поиск"/>
                            </button>

                            <button className={s.search__btn} onClick={cleanFields}>
                                <BackspaceOutlinedIcon/>
                            </button>
                        </Col>
                    </Row>
                    <Row className={s.searches__container2}>
                        <Form>
                            <Form.Check type={'checkbox'} reverse>
                                <Form.Check.Label>Искать удаленные: </Form.Check.Label>
                                <Form.Check.Input checked={showDeleted}
                                                  onChange={(event) => setShowDeleted(event.target.checked)}
                                                  className={s.checkbox}
                                                  type={'checkbox'} isValid/>
                            </Form.Check>
                        </Form>


                    </Row>

                    <Row className={s.action__field}>
                        <button className={s.action__field__btn} onClick={() => setShowModal(true)}>
                            <KeyboardDoubleArrowUpRoundedIcon/>
                            Импортировать
                        </button>
                        {
                            visibleButton ? (
                                <button className={s.action__field__btn} onClick={handleActualization}>
                                    <ReplayRoundedIcon/>
                                    Загрузить актуальные данные
                                </button>
                            ) : null
                        }
                        <ModalImport getData={getData}
                                     show={showModal}
                                     setIsLoading={setIsLoading}
                                     hide={() => setShowModal(false)}/>
                    </Row>

                    <Row className={s.file__content} xs={12}>
                        <Table className={s.file__table} hover responsive>
                            <thead>
                            <tr>
                                {nameColumns.map((item) => (
                                    <th className={s.file__table__col}>{item.name}</th>
                                ))}
                                <th className={s.file__table__col} colSpan={2}></th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                data.length === 0 ? (<tr>
                                    <td colSpan={19}>Данные не найдены</td>
                                </tr>) : (
                                    data.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.createdAt}</td>
                                            <td><NavLink to={`/bics/${item.id}`}>{item.fileName}</NavLink></td>
                                            <td>{item.eddate}</td>
                                            <td>{item.edauthor}</td>
                                            <td>{item.edreceiver}</td>
                                            <td>{item.creationReason}</td>
                                            <td>{item.CreationDateTime}</td>
                                            <td>{item.infoTypeCode}</td>
                                            <td style={{minWidth: "80px"}}>{item.businessDay}</td>
                                            <td>{item.directoryVersion}</td>
                                            <td>{item.PartAggregateID}</td>
                                            <td>{item.createdBy}</td>
                                            <td onClick={() => {
                                                handleDelete(item.id, item.title);
                                            }}>
                                                <DeleteOutlineRoundedIcon/>
                                            </td>
                                            <td onClick={() => {
                                                handleUpdate(item.id, item.title);
                                            }}><UpdateRoundedIcon/></td>
                                        </tr>
                                    ))
                                )
                            }
                            </tbody>
                        </Table>
                    </Row>
                    {
                        isShowFilter ? <PaginationFilter page={currPage}
                                                   params={parameters}
                                                   setPage={setCurrPage}
                                                   getData={handleSearch}
                                                   totalElements={totalElements}
                                                   totalPages={totalPages}/> : <Row className={s.footer}>Выберите файл для просмотра</Row>
                    }
                </Container>
            </>) : (<Loader isLoading={isLoading}/>)
        }</>
    );
}

export default Import;
