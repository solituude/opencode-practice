import React, {useState, useRef, useEffect} from "react";
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


const Import = () => {
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectefFile, setSelectedFile] = useState();

    const [messageApi, contextHolder] = message.useMessage();
    const fileInputRef = useRef(null);
    const username = 'user';
    const password = 'password';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    const [params, setParams] = useState({});

    useEffect(() => {
        getData();
    }, [])

    const handleSetDateStart = (event) => {
        setDateStart(event.target.value.toString());
        console.log(dateStart);
    }

    const handleSetDateEnd = (event) => {
        setDateEnd(event.target.value.toString());
        console.log(dateEnd);
    }

    const handleSetName = (event) => {
        setName(event.target.value.toString());
    }

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

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name);
        console.log(file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', selectedFileName);
        try {
            let response = await fetch(`/api/ed807/upload`, {
                method: 'POST',
                headers: headers,
                body: formData,
            })
            setIsLoading(true);
            console.log('Ответ сервера:', response);
            getData();
            response.ok ? message.info(`Файл успешно добавлен`) : message.info(`Ошибка в загрузке файла`)

        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

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

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleSearch = async (obj) => {
        try {
            let response = await fetch(`/api/ed807/filter`, {
                method: 'GET',
                headers: headers,
                body: obj
            });
            let data = await response.json();
            console.log('DATA FROM SEARCH', data);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const [visibleButton, setVisibleButton] = useState(true);

    const handleActualization = async () => {
        setIsLoading(true);
        try {
            let response = await fetch('/api/ed807/actualization', {
                method: 'GET',
                headers: headers
            });
            console.log(response.text());
            setVisibleButton(false);
            getData();
            setTimeout(() => {
                setVisibleButton(true); // Показать кнопку через 10 секунд
            }, 10000);
        } catch (error) {
            console.log(error.message);
        }
    }

    let getData = async () => {
        try {
            let response = await fetch(`/api/ed807`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            console.log('DATA:', data);
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
                    <Row className={s.searches__container}>
                        <Col>
                            <label className={s.name__search}>
                                Наименование:
                                <div className={s.name__search__textarea}>
                                    <input type="text"
                                           value={name}
                                           onChange={handleSetName}
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
                                           onChange={handleSetDateStart}
                                           className={s.textarea}/>
                                </div>
                            </label>

                            <label className={s.date__search}>
                                по
                                <div className={s.date__search__textarea}>
                                    <input type="date"
                                           onChange={handleSetDateEnd}
                                           className={s.textarea}/>
                                </div>
                            </label>

                            <button className={s.search__btn} onClick={() => {
                                if (name.length !== 0) {
                                    params.title = name;
                                }
                                if (dateStart.length !== 0) {
                                    params.date1 = dateStart;
                                }
                                if (dateEnd.length !== 0) {
                                    params.date2 = dateEnd;
                                }
                                const queryString = new URLSearchParams(params).toString();
                                console.log(params);
                                queryString.length === 0 ? message.info(`Введите значение для поиска`) : handleSearch(params);
                            }}>
                                <img src={searchIcon} alt="поиск"/>
                            </button>

                            <button className={s.search__btn} onClick={cleanFields}>
                                <BackspaceOutlinedIcon/>
                            </button>
                        </Col>
                    </Row>

                    <Row className={s.action__field}>
                        <button className={s.action__field__btn} onClick={handleBrowseClick}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                style={{display: 'none'}}/>
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
                                            <td>{item.fileName}</td>
                                            <td>{item.createdAt}</td>
                                            <td><NavLink to={`/bics/${item.id}`}>{item.title}</NavLink></td>
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
                </Container>
            </>) : (<Loader isLoading={isLoading}/>)
        }</>
    );
}

export default Import;
