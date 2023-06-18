import React, { useState, useRef } from "react";
import { CloseButton, Col, Row, Table, Container } from "react-bootstrap";
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

    const handleSetDateStart = (event) => {
        setDateStart(event.target.value.toString());
    }

    const handleSetDateEnd = (event) => {
        setDateEnd(event.target.value.toString());
    }

    const handleSetName = (event) => {
        setName(event.target.value.toString());
    }

    const cleanFields = () => {
        setName("");
    }

    const nameColumns = [
        {
            name:"№",
        },
        {
            name:"Наименование",
        },
        {
            name:"Дата создания",
        },
        {
            name:"Файл",
        },
        {
            name:"Дата составления ЭС",
        },
        {
            name:"ID составления ЭС",
        },
        {
            name: "ID получателя ЭС",
        },
        {
            name: "Код причины создания",
        },
        {
            name: "Дата создания ЭС",
        },
        {
            name: "Вид представления...",
        },
        {
            name: "Дата ОД",
        },
        {
            name: "Номер версии справ..",
        },
        {
            name: "Признак сопоставления",
        },
        {
            name: "Пользователь",
        },

    ];

    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFileName(file.name);
        console.log(file);
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };


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
                                className={s.textarea} />
                            <CloseButton onClick={() => setName("")} />
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
                                className={s.textarea} />
                        </div>
                    </label>

                    <label className={s.date__search}>
                        по
                        <div className={s.date__search__textarea}>
                            <input type="date"
                                onChange={handleSetDateEnd}
                                className={s.textarea} />
                        </div>
                    </label>

                    <button className={s.search__btn}>
                        <img src={searchIcon} alt="поиск" />
                    </button>

                    <button className={s.search__btn} onClick={cleanFields}>
                        <BackspaceOutlinedIcon/>
                    </button>
                </Col>
            </Row>

            <Row className={s.action__field}>
                <button className={s.action__field__btn}  onClick={handleBrowseClick}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <KeyboardDoubleArrowUpRoundedIcon />
                    Импортировать
                </button>

                <button className={s.action__field__btn}>
                    <UpdateRoundedIcon/>
                    Обновить
                </button>
            </Row>

            <Row className={s.file__content} xs={12}>
                <Table className={s.file__table} hover>
                    <thead>
                        {nameColumns.map((item) => (
                            <th className={s.file__table__col}>{item.name}</th>
                        ))}
                        <th className={s.file__table__col}></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>file345678.xlmns</td>
                            <td>23-05-2023</td>
                            <td><NavLink to={`/bics/${623428932}`}>file345678.xlmns</NavLink></td>
                            <td>04-05-2023</td>
                            <td>6234928932</td>
                            <td></td>
                            <td>FCBD</td>
                            <td>04-05-2023</td>
                            <td>FIRR</td>
                            <td>23-05-2023</td>
                            <td>1</td>
                            <td></td>
                            <td>денис</td>
                            <td><DeleteOutlineRoundedIcon/></td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default FilesBase;
