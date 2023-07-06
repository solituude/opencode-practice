import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import s from './bic.module.scss';

const ExpandedTable = (props) => {
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

    const [accounts, setAccounts] = useState([]);
    const [rstrList, setRstrList] = useState({});
    const [swbics, setSwbics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [accRstrList, setAccRstrList] = useState([]);

    const [[key, isTableOpen], setIsTableOpen] = useState([undefined, false]);

    useEffect(() => {
        setIsLoading(true)
        setAccounts(props.accounts);
        setSwbics(props.swbics);
        setRstrList(props.rstrList);
        setIsLoading(false);
    }, [props.accounts, props.swbics, props.rstrList])


    const handleOpenSubTable = (accId) => {
        // setIsTableOpen(false);
        getAccRstrList(accId)
            .then(accRstr => {
                setAccRstrList(accRstr);
                setIsTableOpen([accId, !isTableOpen]);
                setIsLoading(false);
            })
            .catch(e => console.log(e.message));

        // setIsTableOpen([payerId, !isTableOpen]);
        // setIsLoading(false);
    }

    const getAccRstrList = async(accId) => {
        try{
            let response = await fetch(`/api/accRstr?id=${accId}`,{
                method: 'GET',
                headers: props.headers
            })
            let data = await response.json();
            console.log('ACCRSTRLIST: ', data);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <> {!isLoading ? (
            <>
                {
                    accounts.length === 0 && Object.keys(rstrList).length === 0 && swbics.length === 0 ?
                        (<p>Данные не найдены</p>) :
                        (
                            <>
                                <p>Информация о БИК {props.bic}</p>
                                {
                                    Object.keys(rstrList).length === 0 ? null : (
                                        <>
                                            {/*<p>Перечень ограничений участника</p>*/}
                                            <Table responsive hover>
                                                <thead>
                                                <tr>
                                                    <th className={s.exp__header} colSpan={2}>Перечень ограничений участника</th>
                                                </tr>
                                                <tr>
                                                    <th className={s.exp__header}>Код ограничения</th>
                                                    <th className={s.exp__header}>Дата начала действия ограничения</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>{rstrList.rstr}</td>
                                                    <td>{rstrList.rstrDate}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </>
                                    )
                                }

                                {
                                    swbics.length === 0 ? null : (
                                        <>
                                            <Table responsive hover>
                                                <thead>
                                                <tr><th colSpan={3} className={s.exp__header}>Перечень БИК, соответствующий участнику</th></tr>
                                                <tr>
                                                    <th className={s.exp__header}>№</th>
                                                    <th className={s.exp__header}>БИК</th>
                                                    <th className={s.exp__header}>Признак использования БИК</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    swbics.map((item, key) => (
                                                        <tr>
                                                            <td>{item.id}</td>
                                                            <td>{item.swbic}</td>
                                                            <td>{item.defaultSWBIC}</td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </>
                                    )
                                }
                                {
                                    accounts.length === 0 ? null : (
                                        <>

                                            <Table responsive hover>
                                                <thead>
                                                <tr>
                                                    <th className={s.exp__header} colSpan={8}>Информация о счетах участника перевода
                                                        денежных средств.</th>
                                                </tr>
                                                <tr>
                                                    {columnsAccount.map((item, index) => (
                                                        <th className={s.exp__header}>{item.title}</th>
                                                    ))}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    accounts.map((item, index) => (
                                                        <>
                                                            <tr onClick={() => handleOpenSubTable(item.id)}>
                                                                <td>{item.id}</td>
                                                                <td>{item.account}</td>
                                                                <td>{item.regulationAccountType}</td>
                                                                <td>{item.accountCBRBIC}</td>
                                                                <td>{item.ck}</td>
                                                                <td>{item.dateIn}</td>
                                                                <td>{item.dateOut}</td>
                                                                <td>{item.accountStatus}</td>
                                                            </tr>
                                                            {
                                                                isTableOpen && key === item.id ? (
                                                                    <tr>
                                                                        <td colSpan={8}>
                                                                            {
                                                                                accRstrList.length === 0 ? (<p>Данные не найдены</p>) : (
                                                                                    <Table>
                                                                                        <thead>
                                                                                        <tr>
                                                                                            <th>Код ограничения</th>
                                                                                            <th>Дата начала действия ограничения</th>
                                                                                            <th>БИК преемника</th>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {
                                                                                            accRstrList.map((item, key) => (
                                                                                                <tr>
                                                                                                    <td>{item.accRstr}</td>
                                                                                                    <td>{item.accRstrDate}</td>
                                                                                                    <td>{item.successorBIC}</td>
                                                                                                </tr>
                                                                                            ))
                                                                                        }
                                                                                        </tbody>
                                                                                    </Table>
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ) : null
                                                            }
                                                        </>

                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </>
                                    )
                                }
                            </>
                        )
                }
            </>
        ) : null}

        </>

    )
}

export default ExpandedTable;