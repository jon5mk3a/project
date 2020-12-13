import Navbar from './Home/Navbar';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login/Login'
import Register from './Register/Register';
import './App.css';

function App() {
  const [isRegister, setRegister] = useState(false)

  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route>
        <div>
          {isRegister ? <Register /> : <Login />}
          <div onClick={() => setRegister(!isRegister)} className="toggle">
            {isRegister ? 'Have you got an account? Login' : 'Do not you have account? Sign up'}
          </div>
        </div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
