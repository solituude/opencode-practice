import React, {useEffect, useState} from 'react';
import {Container, Row, Table} from "react-bootstrap";
import s from '../directories.module.scss';
import ModalNewItemEq4 from "../ModalNewItemEq4";
import ModalEditItemEq4 from "../ModalEditItemEq4";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";

// статус участника

const AccRstr = () => {
    const type = 'accountStatus'
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

    const getData = async () => {
        try {
            let response = await fetch(`/api/directories/${type}?dicId=0`, {
                method: 'GET',
                headers: headers
            });

            let dataResponse = await response.json();
            console.log('DATA:', dataResponse);
            setData(dataResponse);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getData();
    },[])


    const handleAddNewItem = async (newData) => {
        try{
            let response = await fetch(`/api/directories/upload/${type}`,
                {
                    method: 'POST',
                    headers: headersPost,
                    body: JSON.stringify(newData)
                });
            console.log(newData);
            let data = await response.json();
            console.log('DATA AFTER ADD', data);
            getData();
        } catch (e){
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
        try{
            let response = await fetch(`/api/directories/${editData.id}`, {
                method: 'PUT',
                headers: headersPost,
                body: JSON.stringify(updateData)
            })
            let data = await response.json();
            console.log('DATA AFTER EDIT', data);
            getData();
        } catch (e){
            console.log(e.message);
        }
    }

    const handleDelete = async (ID) => {
        try{
            let response = await fetch(`/api/directories/${ID}`, {
                method: 'DELETE',
                headers: headers,
            })
            let data = await response.json();
            console.log('DATA AFTER DELETE', data);
            getData();
        } catch (e){
            console.log(e.message);
            getData();
        }
    }

    const handleUpdate = async (ID) => {
        try{
            let response = await fetch(`/api/directories/${ID}`, {
                method: 'PATCH',
                headers: headers,
            })
            let data = await response.json();
            console.log('DATA AFTER PATCH', data);
            getData();
        } catch (e){
            console.log(e.message);
        }
    }

    return (
        <Container fluid className={s.main__container}>
            <Row className={s.edit__area}>
                <button className={s.edit__area__btn}
                        onClick={() => setModalShow(true)}>
                    <AddRoundedIcon/>
                    Новая запись
                </button>
                <ModalNewItemEq4
                    setNewDate={handleAddNewItem}
                    show={modalShow}
                    type="accountStatus"
                    onHide={() => setModalShow(false)}/>
            </Row>
            <Row>
                <Table hover responsive>
                    <tr>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1" rowSpan={2}>Код</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-4" rowSpan={2}>Наименование</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-2" colSpan={2}>Период действия</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-3" colSpan={2}>Создано</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-3" colSpan={2}>Изменено</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} rowSpan={2} colSpan={2}></th>
                    </tr>
                    <tr>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1">c</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1">по</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-2">Дата</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1">Пользователь</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-2">Дата</th>
                        <th style={{border: "1px solid #999CA5", textAlign: "center"}} className="col-1">Пользователь</th>
                    </tr>

                    <tbody>
                    {
                        data.map((item) => (
                            <tr>
                                <td  onClick={() => {
                                    setEditData(item);
                                    setEditModalShow(true);
                                }}>{item.code}</td>
                                <td  onClick={() => {
                                    setEditData(item);
                                    setEditModalShow(true);
                                }}>{item.name}</td>
                                <td  onClick={() => {
                                    setEditData(item);
                                    setEditModalShow(true);
                                }}>{item.validityStart}</td>
                                <td  onClick={() => {
                                    setEditData(item);
                                    setEditModalShow(true);
                                }}>{item.validityEnd}</td>
                                <td  onClick={() => {
                                    setEditData(item);
                                    setEditModalShow(true);
                                }}>{item.createdAt}</td>
                                <td  onClick={() => {
                                    setEditData(item);
                                    setEditModalShow(true);
                                }}>{item.createdBy}</td>
                                <td  onClick={() => {
                                    setEditData(item);
                                    setEditModalShow(true);
                                }}>{item.updatedAt}</td>
                                <td  onClick={() => {
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
        </Container>
    );
}

export default AccRstr;