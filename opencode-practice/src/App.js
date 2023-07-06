import './App.css';
import Header from "./Components/Header/Header";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Import from './Components/Import/Import';
import Directory from "./Components/Directories/Directory";
import BIC from "./Components/BIC/BIC";

function App() {
    return (
        <Container fluid className="content">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Import/>}/>
                    <Route path='/ed807' element={<Import/>}/>
                    <Route path='/bics/:id' element={<BIC/>}/>
                    <Route path='/directories/accountStatus' element={<Directory type="accountStatus"/>}/>
                    <Route path='/directories/regulationAccountType' element={<Directory type="accountType"/>}/>
                    <Route path='/directories/srvcs' element={<Directory type="availableServices"/>}/>
                    <Route path='/directories/changeType' element={<Directory type="changeType"/>}/>
                    <Route path='/directories/xchType' element={<Directory type="exchangeParticipant"/>}/>
                    <Route path='/directories/participantStatus' element={<Directory type="participantStatus"/>}/>
                    <Route path='/directories/creationReason' element={<Directory type="creationReason"/>}/>
                    <Route path='/directories/accRstr' element={<Directory type="limitationOperations"/>}/>
                    <Route path='/directories/rstr' element={<Directory type="limitationServices"/>}/>
                    <Route path='/directories/infoTypeCode' element={<Directory type="presentationType"/>}/>
                    <Route path='/directories/ptType' element={<Directory type="participantType"/>}/>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
