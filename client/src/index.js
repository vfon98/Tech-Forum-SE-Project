import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import Router
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//Import view of this product
import Homepage from './views/Homepage/Homepage.jsx';
import Login from './views/Login/Login';
import Register from './views/Register/Register'

let history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/' exact component={Homepage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
