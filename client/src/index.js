import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import Router
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//Import view of this product
import Homepage from './views/Homepage/Homepage.jsx';

let history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Homepage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
