import React, {useState} from "react";
// import axios from 'axios';
import FormEmail from "./contentLogin/FormEmail";
import FromPassword from "./contentLogin/FormPassword";
import s from './login.module.css'
const LogIn = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e) => {
        setShowError(true);
        // e.preventDefault();
        // try {
        //     const response = await axios.post('/customauth/customauth/login/', {email, password});
        //     localStorage.setItem('token', response.data.token);
        //     window.location.href = '/';
        // } catch (error) {
        //     setShowError(true);
        // }
    }

    return (
        <div className={s.content}>
            <form className={s.main_block_auth} onSubmit={handleSubmit}>

                <div className={s.heading}>
                    Вход
                </div>

                <FormEmail setEmail={setEmail}
                           showError={showError}
                           valueEmail={email}/>

                <FromPassword setPassword={setPassword}
                              showError={showError}
                              valuePassword={password}/>

                <div className={s.buttons_container}>
                    <button className={s.btn_entrance} type="submit">
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
};

export default LogIn;