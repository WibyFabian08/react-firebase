import logo from '../../../assets/img/logo/logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux/';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={Login}></Route>
          <Route path='/register' exact component={Register}></Route>
          <Route path='/dashboard' exact component={Dashboard}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
