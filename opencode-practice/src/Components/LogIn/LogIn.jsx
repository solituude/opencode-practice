import React, {useState} from "react";
import FormEmail from "./contentLogin/FormEmail";
import FromPassword from "./contentLogin/FormPassword";
import s from './login.module.css'
const LogIn = (props) => {
    // const apiUrl = 'http://localhost:9090';

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post(`/login`, {email, password});
            // localStorage.setItem('token', response.data.token);
            // window.location.href = '/';
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
            localStorage.setItem('tokenAuth', btoa(email + ':' + password));
            props.setHeaders(headers);
            props.setIsLoggedIn(true);
        } catch (error) {
            setShowError(true);
        }
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