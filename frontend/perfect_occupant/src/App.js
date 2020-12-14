import Navbar from './Home/Navbar';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Apartments from './Home/Apartments';
import Comments from './Home/Comments';
import './App.css';

function App() {

  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/sign-up'>
          <Register />
        </Route>
        <Route path='apartments'>
          <Apartments />
        </Route>
        <Route path='/comments'>
          <Comments />
        </Route>
      </Switch>
    </>
  );
};

export default App;
