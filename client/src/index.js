import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import Router
import { Switch, Route, Router } from 'react-router-dom';
import history from './utils/history'

//Import view of this product
import Homepage from './views/Homepage/Homepage.jsx';
import Discussion from './views/Discussion/Discussion'
import Room from './views/Room/Room';
import Profile from './views/Profile/ProfilePage'
import NewsDetail from './views/NewsDetail/NewsDetail';


ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Homepage} />
      <Route path='/discussion' exact component={Discussion} />
      <Route path='/room/:name' exact component={Room} />
      <Route path='/news/:id' exact component={NewsDetail} />
      <Route path='/profile' exact component={Profile} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
