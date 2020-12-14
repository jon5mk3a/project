import Login from '../Login/Login';
import Register from '../Register/Register';
import { useState } from 'react';

function LoginRegister() {
    const [isRegister, setRegister] = useState(false)

    return(
        <div>
          {isRegister ? <Register /> : <Login />}
          <div onClick={() => setRegister(!isRegister)} className="toggle">
            {isRegister ? 'Have you got an account? Login' : 'Do not you have account? Sign up'}
          </div>
        </div>
    );
};

export default LoginRegister;
