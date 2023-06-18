import './App.css';
import Header from "./Components/Header/Header";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FilesBase from './Components/FilesBase/FilesBase';
import AccountStatus from "./Components/Directories/AccountStatus/AccountStatus";
import AccountTypeInAccordanceWithStandards
    from "./Components/Directories/AccountTypeInAccordanceWithStandard/AccountTypeInAccordanceWithStandarts";
import AvailableMoneyTransferServices
    from "./Components/Directories/AvaliableMoneyTransferServices/AvaliableMoneyTransferServices";
import ChangeTypeInDirectory from "./Components/Directories/ChangeTypeInDirectory/ChangeTypeInDirectory";
import ExchangeParticipant from "./Components/Directories/ExchangeParticipant/ExchangeParticipant";
import MemberStatus from "./Components/Directories/MemberStatus/MemberStatus";
import ReasonOfCreation from "./Components/Directories/ReasonOfCreation/ReasonOfCreation";
import RestrictionsOnAccountTransactions
    from "./Components/Directories/RestrictionsOnAccountTransactions/RestrictionsOnAccountTransactions";
import RestrictionsOnMoneyTransferServices
    from "./Components/Directories/RestrictionsOnMoneyTransferServices/RestrictionsOnMoneyTransferServices";
import TypeOfInformationPresentation
    from "./Components/Directories/TypeOfInformationPresentation/TypeOfInformationPresentation";
import TypeOfTransferParticipant from "./Components/Directories/TypeOfTransferParticipant/TypeOfTransferParticipant";
import DataBase from "./Components/DataBase/DataBase";
import LogIn from "./Components/LogIn/LogIn";
import {useState} from "react";

function App() {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <Container fluid className="content">
            <BrowserRouter>
                {isLogged ? (
                        <>
                            <Header/>
                            <Routes>
                                <Route path="/" element={<FilesBase/>}/>
                                <Route path='/ed807' element={<FilesBase/>}/>
                                <Route path='/bics/:id' element={<DataBase/>}/>
                                <Route path='/directories/accountStatus' element={<AccountStatus/>}/>
                                <Route path='/directories/accountTypeWithStandards'
                                       element={<AccountTypeInAccordanceWithStandards/>}/>
                                <Route path='/directories/availableMoneyTransferServices'
                                       element={<AvailableMoneyTransferServices/>}/>
                                <Route path='/directories/changeTypeInDirectory'
                                       element={<ChangeTypeInDirectory/>}/>
                                <Route path='/directories/exchangeParticipant' element={<ExchangeParticipant/>}/>
                                <Route path='/directories/memberStatus' element={<MemberStatus/>}/>
                                <Route path='/directories/reasonOfCreation' element={<ReasonOfCreation/>}/>
                                <Route path='/directories/restrictionsOnAccountTransactions'
                                       element={<RestrictionsOnAccountTransactions/>}/>
                                <Route path='/directories/restrictionsOnMoneyTransferServices'
                                       element={<RestrictionsOnMoneyTransferServices/>}/>
                                <Route path='/directories/typeOfInformationPresentation'
                                       element={<TypeOfInformationPresentation/>}/>
                                <Route path='/directories/typeOfTransferParticipant'
                                       element={<TypeOfTransferParticipant/>}/>
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
