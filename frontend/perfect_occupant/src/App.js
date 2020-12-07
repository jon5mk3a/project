import Navbar from './Home/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' extract component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
