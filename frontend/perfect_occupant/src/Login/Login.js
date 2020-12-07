import { useState } from 'react'
import { useSetUser } from './UserContext'
import { login } from './api'
import './Login.css';

function Login() {
    const setMe = useSetUser();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault()
        const data = await login(name, password)
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
                    <input value={name} on onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                {isError &&
                <div className='error'>
                    The user or the password are invalid
                    </div>
                    }
                <button>Login</button>
                <div className='note'>Are you sure that you are registered?</div>
            </form>
        </div>
    );
};

export default Login;
