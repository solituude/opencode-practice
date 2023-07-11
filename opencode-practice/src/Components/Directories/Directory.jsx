import React, {useEffect, useState} from 'react';
import {CloseButton, Col, Container, Row, Table} from "react-bootstrap";
import s from './directories.module.scss';
import ModalNewItemEq4 from "./ModalNewItemEq4";
import ModalEditItemEq4 from "./ModalEditItemEq4";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import {message} from "antd";
import Pagination from "../UI/Pagination";
import Form from "react-bootstrap/Form";
import PaginationFilter from "../UI/PaginationFilter";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const Directory = (props) => {
    const type = props.type;
    console.log(type);
    const username = 'user';
    const password = 'password';
    const headers = new Headers();
    const headersPost = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headersPost.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headersPost.append('Content-Type', 'application/json');
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editData, setEditData] = useState({});
    const [messageApi, contextHolder] = message.useMessage();

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [validityStart, setValidityStart] = useState('');
    const [validityEnd, setValidityEnd] = useState('')

    //переменные для отображения всех лэлементов
    const [page, setPage] = useState(1);
    const [showDeleted, setShowDeleted] = useState(false);
    const [totalElements, setTotalElements] = useState(0);


    //переменные для отображения отфильтрованных элементов
    const [isShowFilter, setIsShowFilter] = useState(false);
    const [parameters, setParameters] = useState({});
    const [totalElementsFilter, setTotalElementsFilter] = useState(0);
    const [pageFilter, setPageFilter] = useState(1);

    const handleSearch = async (params, page) => {
        if (page >= 1){
            try {
                params.deleted = showDeleted;
                let response = await fetch(`/api/directories/filter/${type}?page=${page - 1}`, {
                    method: 'POST',
                    headers: headersPost,
                    body: JSON.stringify(params)
                });
                console.log(params)
                let data = await response.json();
                console.log('DATA FROM SEARCH', data);
                setIsShowFilter(true);
                setParameters(params)
                setTotalElementsFilter(data.totalElements);
                setData(data.content);
            } catch (error) {
                console.log(error);
            }
        }
    }


    const getData = async (page) => {
        if(page >= 1) {
            setIsShowFilter(false);
            try {
                let response = await fetch(`/api/directories/${type}?page=${page-1}`, {
                    method: 'GET',
                    headers: headers
                });

                let dataResponse = await response.json();
                console.log('DATA:', dataResponse.content);
                setData(dataResponse.content);
                setTotalElements(dataResponse.totalElements);
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    useEffect(() => {
        getData(page);
    }, [type])


    const handleAddNewItem = async (newData) => {
        try {
            let response = await fetch(`/api/directories/add/${type}`,
                {
                    method: 'POST',
                    headers: headersPost,
                    body: JSON.stringify(newData)
                });
            console.log(newData);
            let data = await response.json();
            console.log('DATA AFTER ADD', data);
            response.ok ? message.info(`Запись успешно добавлена`):
                message.info(`Ошибка в добавлении записи`)
            getData(1);
        } catch (e) {
            console.log(e.message);
        }
    }
    const handleOpenEdit = () => {
        if (editModalShow) {
            return (<ModalEditItemEq4 show={true}
                                      onHide={() => setEditModalShow(false)}
                                      typeDir={type}
                                      handleEditItem={handleEditItem}
                                      data={editData}/>);
        } else return null;

    }
    const handleEditItem = async (updateData) => {
        try {
            let response = await fetch(`/api/directories/${editData.id}`, {
                method: 'PUT',
                headers: headersPost,
                body: JSON.stringify(updateData)
            })
            let data = await response.json();
            console.log('DATA AFTER EDIT', data);
            response.ok ? message.info(`Запись успешно изменена`):
                message.info(`Ошибка в изменении записи`)
            getData(1);
        } catch (e) {
            console.log(e.message);
            getData(1);
            message.info(`Запись успешно изменена`);
        }
    }

    const handleDelete = async (ID) => {
        try {
            let response = await fetch(`/api/directories/${ID}`, {
                method: 'DELETE',
                headers: headers,
            })
            let data = await response.json();
            console.log('DATA AFTER DELETE', data);
            getData(page);
            message.info(`Запись успешно удалена`)
                // message.info(`Ошибка в изменении записи`)
        } catch (e) {
            console.log(e.message);
            message.info(`Запись успешно удалена`)
            getData(page);
        }
    }

    const handleUpdate = async (ID) => {
        try {
            let response = await fetch(`/api/directories/${ID}`, {
                method: 'PATCH',
                headers: headers,
            })
            let data = await response.json();
            console.log('DATA AFTER PATCH', data);
            response.ok ? message.info(`Запись успешно обновлена`):
                message.info(`Ошибка в изменении обновлена`)
            getData(page);
        } catch (e) {
            console.log(e.message);
        }
    }

    const showAllRows = () => {
        setIsShowFilter(false);
        setName("");
        setCode('');
        getData(1);
    }


    return (
        <>
            {contextHolder}
            <Container fluid className={s.main__container}>

                <Row className={s.search__container1}>
                    {
                        isShowFilter ?
                            <button className={s.action__field__btn} onClick={showAllRows}>
                                <ArrowBackRoundedIcon/>
                                Назад ко всем записям
                            </button>
                        : null
                    }

                    <label className={s.search__item}>
                        <p className={"col-1 m-auto"}>Код:</p>
                        <div className={s.search__item__textarea}>
                            <input type="text"
                                   value={code}
                                   onChange={(event) => setCode(event.target.value)}
                                   className={s.textarea}/>
                            <CloseButton onClick={() => setCode("")}/>
                        </div>
                    </label>
                </Row>

                <Row className={s.search__container2}>
                    <label className={s.search__item}>
                        <p className="col-1 m-auto">Наименование:</p>
                        <div className={s.search__item__textarea}>
                            <input type="text"
                                   value={name}
                                   onChange={(event) => setName(event.target.value)}
                                   className={s.textarea}/>
                            <CloseButton onClick={() => setName("")}/>
                        </div>
                    </label>
                </Row>

                <Row className={s.search__container3}>
                    <Col>
                        <label className={s.search__item}>
                            <p className="col-2 m-auto">Действует c:</p>
                            <div className={s.search__item__textarea}>
                                <input type="date"
                                       onChange={(event) => setValidityStart(event.target.value)}
                                       className={s.textarea}/>
                            </div>
                        </label>
                    </Col>
                    <Col>
                        <label className={s.search__item}>
                            <p className="col-2 m-auto">по:</p>
                            <div className={s.search__item__textarea}>
                                <input type="date"
                                       onChange={(event) => setValidityEnd(event.target.value)}
                                       className={s.textarea}/>
                            </div>
                        </label>
                    </Col>

                </Row>

                <Row className={s.search__container4}>
                    <Col xs={6}>
                        <Form>
                            <Form.Check type={'checkbox'} >
                                <Form.Check.Label>Искать удаленные </Form.Check.Label>
                                <Form.Check.Input checked={showDeleted}
                                                  onChange={(event) => setShowDeleted(event.target.checked)}
                                                  className={s.checkbox}
                                                  type={'checkbox'} isValid/>
                            </Form.Check>
                        </Form>
                    </Col>
                    <Col xs={6} className={s.search}>
                        <button className={s.search__btn}
                                onClick={() => {
                                    let params = {};
                                    if (code.length !== 0) {
                                        params.code = code;
                                    }
                                    if (name.length !== 0) {
                                        params.name = name;
                                    }
                                    if (validityStart.length !== 0) {
                                        params.validityStart = validityStart;
                                    }
                                    if (validityEnd.length !== 0) {
                                        params.validityEnd = validityEnd;
                                    }
                                    Object.entries(params).length === 0 ? message.info(`Введите значение для поиска`)
                                        : handleSearch(params, 1);
                                }}>
                            Поиск
                            <SearchRoundedIcon/>
                        </button>
                    </Col>



                </Row>

                <Row className={s.edit__area}>
                    <button className={s.edit__area__btn}
                            onClick={() => setModalShow(true)}>
                        <AddRoundedIcon/>
                        Новая запись
                    </button>
                    <ModalNewItemEq4
                        setNewDate={handleAddNewItem}
                        show={modalShow}
                        // type="accountStatus"
                        type={type}
                        onHide={() => setModalShow(false)}/>
                </Row>
                <Row>
                    <Table className={s.table} hover responsive>
                        <thead>
                        <tr>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1"
                                rowSpan={2}>Код
                            </th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-4"
                                rowSpan={2}>Наименование
                            </th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-2"
                                colSpan={2}>Период действия
                            </th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-3"
                                colSpan={2}>Создано
                            </th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-3"
                                colSpan={2}>Изменено
                            </th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} rowSpan={2} colSpan={2}></th>
                        </tr>
                        <tr>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1">c</th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1">по</th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-2">Дата</th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}}
                                className="col-1">Пользователь
                            </th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-2">Дата</th>
                            <th style={{border: "1px solid #999CA5", textAlign: "center"}}
                                className="col-1">Пользователь
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        { data.length === 0 ? (<tr><td colSpan={8}>Данные не найдены</td></tr>) :
                            data.map((item) => (
                                <tr>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.code}</td>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.name}</td>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.validityStart}</td>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.validityEnd}</td>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.createdAt}</td>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.createdBy}</td>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.updatedAt}</td>
                                    <td onClick={() => {
                                        setEditData(item);
                                        setEditModalShow(true);
                                    }}>{item.updatedBy}</td>
                                    <td onClick={() => handleDelete(item.id)}>
                                        <DeleteOutlineRoundedIcon/>
                                    </td>
                                    <td onClick={() => {
                                        handleUpdate(item.id);
                                    }}><UpdateRoundedIcon/></td>
                                </tr>
                            ))
                        }
                        {handleOpenEdit()}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    {
                        isShowFilter ? <PaginationFilter page={pageFilter}
                                                         setPage={setPageFilter}
                                                         getData={handleSearch}
                                                         totalElements={totalElementsFilter}
                                                         params={parameters}/> :
                            <Pagination page={page}
                                        setPage={setPage}
                                        totalElements={totalElements}
                                        getData={getData}/>
                    }
                </Row>
            </Container>
        </>
    );
}

export default Directory;