import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import Router
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//Import view of this product
import Homepage from './views/Homepage/Homepage.jsx';
import Discussion from './views/Discussion/Discussion'
import Room from './views/Room/Room';

let history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Homepage} />
      <Route path='/discussion' exact component={Discussion} />
      <Route path='/room/:name' exact component={Room} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
