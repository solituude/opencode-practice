import React, {useState, useRef, useEffect} from "react";
import {CloseButton, Col, Row, Table, Container} from "react-bootstrap";
import s from './filesbase.module.scss';
import searchIcon from '../../img/searchIcon.svg';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import {NavLink} from "react-router-dom";

const FilesBase = () => {
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [data, setData] = useState([]);

    // const apiUrl = 'http://localhost:9090';

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

    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        setSelectedFileName(file.name);
        console.log(file);

        const username = 'user1';
        const password = 'password1';
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', selectedFileName);
        fetch(`/api/ed807`, {
            method: 'POST',
            headers: headers,
            body: formData,
        })
            .then((response) => {
                console.log('Ответ сервера:', response);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            })
    }


    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };


    useEffect(() => {
        getData();
    }, [])

    let getData = async () => {
        const username = 'user1';
        const password = 'password1';
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        try {
            let response = await fetch(`/api/ed807`, {
                method: 'GET',
                headers: headers
            });
            let data = await response.json();
            console.log('DATA:', data);
            setData(data);
        } catch (e) {
            console.log(e.message);
        }finally {
            console.log("fksdl")
        }

    }


    return (
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
                                   defaultValue=""
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

                    <button className={s.search__btn}>
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

                <button className={s.action__field__btn}>
                    <UpdateRoundedIcon/>
                    Обновить
                </button>
            </Row>

            <Row className={s.file__content} xs={12}>
                <Table className={s.file__table} hover>
                    <tr>
                        {nameColumns.map((item) => (
                            <td className={s.file__table__col}>{item.name}</td>
                        ))}
                        <td className={s.file__table__col}></td>
                    </tr>

                    {
                        data.map((item, index) => (
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
                                <td>{item.businessDay}</td>
                                <td>{item.directoryVersion}</td>
                                <td>{item.PartAggregateID}</td>
                                <td>{item.createdBy}</td>
                                <td><DeleteOutlineRoundedIcon/></td>
                            </tr>
                        ))
                    }
                </Table>
            </Row>
        </Container>
    );
}

export default FilesBase;
