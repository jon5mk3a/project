import { useState } from 'react'
import { useSetUser, useUser } from '../UserContext'
import { login } from '../api'
import './Login.css';
import { Redirect } from 'react-router-dom';

function Login() {
    const setMe = useSetUser();
    const me = useUser();

    const [nick_name, setNick_name] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    if (me) return <Redirect to='/' />

    const handleSubmit = async e => {
        e.preventDefault()
        const data = await login(nick_name, password)
        if (data.token) {
            setMe(data)
        } else {
            setIsError(true)
        }
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input value={nick_name} on onChange={e => setNick_name(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                {isError &&
                <div className='error'>
                    The user or the password are invalid
                    </div>
                    }
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
