import './App.css';
import Header from "./Components/Header/Header";
import {Container} from "react-bootstrap";
import FilesBase from "./Components/FilesBase/FilesBase";
import DataBase from "./Components/DataBase/DataBase";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Container fluid>
            <Header/>
            <FilesBase/>
            <DataBase/>
        </Container>
    );
}

export default App;
