import './App.css';
import Header from "./Components/Header/Header";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FilesBase from './Components/FilesBase/FilesBase';
import AccountStatus from "./Components/Directories/AccountStatus/AccountStatus";
import RegulationAccountType from "./Components/Directories/RegulationAccountType/RegulationAccountType";
import Srvcs from "./Components/Directories/Srvcs/Srvcs";
import ChangeType from "./Components/Directories/ChangeType/ChangeType";
import XchType from "./Components/Directories/XchType/XchType";
import ParticipantStatus from "./Components/Directories/ParticipantStatus/ParticipantStatus";
import CreationReason from "./Components/Directories/CreationReason/CreationReason";
import AccRstr from "./Components/Directories/AccRstr/AccRstr";
import Rstr from "./Components/Directories/Rstr/Rstr";
import InfoTypeCode from "./Components/Directories/InfoTypeCode/InfoTypeCode";
import PtType from "./Components/Directories/PtType/PtType";
import DataBase from "./Components/DataBase/DataBase";
import LogIn from "./Components/LogIn/LogIn";
import {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // console.log(localStorage.getItem('token'))

    function handleLogin(token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    function handleLogout() {
        // localStorage.removeItem('token');
        setIsLoggedIn(false);
    }


    return (
        <Container fluid className="content">
            {console.log(isLoggedIn)}
            <BrowserRouter>
                {isLoggedIn? (
                    <>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<FilesBase/>}/>
                            <Route path='/ed807' element={<FilesBase/>}/>
                            <Route path='/bics/:id' element={<DataBase/>}/>
                            <Route path='/directories/accountStatus' element={<AccountStatus/>}/>
                            <Route path='/directories/regulationAccountType' element={<RegulationAccountType/>}/>
                            <Route path='/directories/srvcs' element={<Srvcs/>}/>
                            <Route path='/directories/changeType' element={<ChangeType/>}/>
                            <Route path='/directories/xchType' element={<XchType/>}/>
                            <Route path='/directories/participantStatus' element={<ParticipantStatus/>}/>
                            <Route path='/directories/creationReason' element={<CreationReason/>}/>
                            <Route path='/directories/accRstr' element={<AccRstr/>}/>
                            <Route path='/directories/rstr' element={<Rstr/>}/>
                            <Route path='/directories/infoTypeCode' element={<InfoTypeCode/>}/>
                            <Route path='/directories/ptType' element={<PtType/>}/>
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path='/' element={<LogIn/>}/>
                        <Route path='/login' element={<LogIn/>}/>
                    </Routes>
                )}

            </BrowserRouter>
        </Container>
    );
}

export default App;
