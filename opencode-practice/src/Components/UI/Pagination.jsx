import React from "react";
import s from "../BIC/bic.module.scss";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {Row} from "react-bootstrap";
//
const Pagination = (props) => {
    return(
        <Row className={s.pagination}>
            {
                props.page === 1 ? (null) : (
                    <button className={s.pagination__btn} onClick={() => {
                        // setLastElem(lastElem - countBicPerPage)
                        props.setPage(props.page - 1);
                        props.getData(props.page - 1);
                    }}>
                        <ArrowBackRoundedIcon/>
                    </button>
                )
            }
            <span className={s.pagination__text}>Страница</span>
            <input className={s.pagination__input} value={props.page}
                   onChange={(e) => {
                       if (Number(e.target.value) >= 0 && Number(e.target.value) <= (Math.floor(props.totalElements / 25) + 1)) {
                           props.setPage(Number(e.target.value))
                           props.getData(Number(e.target.value))
                       } else {
                           props.setPage(Math.floor(props.totalElements / 25) + 1);
                           props.getData(Math.floor(props.totalElements / 25) + 1);
                       }
                   }}/>
            <span className={s.pagination__text}>
                            из {Math.floor(props.totalElements / 25) + 1}</span>
            {
                props.page === (Math.floor(props.totalElements / 25) + 1) ? (null) : (
                    <button className={s.pagination__btn} onClick={() => {
                        props.setPage(props.page + 1);
                        props.getData(props.page + 1);
                    }}>
                        <ArrowForwardRoundedIcon/>
                    </button>
                )
            }
            <span className={s.pagination__text2} style={{right: 0}}>
                            Всего записей {props.totalElements}
                        </span>
        </Row>
    )
}

export default Pagination;