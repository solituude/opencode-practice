import React from 'react';
import s from "../BIC/bic.module.scss";
import {Fade} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = (props) => {
    return(
        <Box className={s.loader}>
            <Fade in={props.isLoading} exit={props.isLoading} className={s.loader__item}>
                <CircularProgress/>
            </Fade>
        </Box>
    );
}

export default Loader;