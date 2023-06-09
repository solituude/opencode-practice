import React from "react";
import FilesBase from "./FilesBase/FilesBase";
import DataBase from "./DataBase/DataBase";
import {Row} from "react-bootstrap";

const Import = () => {
    return(
        <Row>
            <FilesBase/>
            <DataBase/>
        </Row>
    );
}

export default Import;