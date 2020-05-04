import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import Router
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import history from './utils/history';

//Import view of this product
import Homepage from './views/Homepage/Homepage.jsx';
import Discussion from './views/Discussion/Discussion';
import Room from './views/Room/Room';
import Profile from './views/Profile/ProfilePage';
import NewsDetail from './views/NewsDetail/NewsDetail';
import RoomNews from './views/RoomNews/RoomNews';
import News from './views/News/News';
import CreatePost from './views/CreatePost/CreatePost';
import Admin from 'views/Admin/Admin';
import RoomsManager from 'views/Admin/RoomsManager/RoomsManager';
import UsersManager from 'views/Admin/UsersManager/UsersManager';
import ReportsManager from 'views/Admin/ReportsManager/ReportsManager';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Homepage} />
      <Route path='/discussion' exact component={Discussion} />
      <Route path='/room/:name' exact component={Room} />
      <Route path='/room/:name/news' exact component={RoomNews} />
      <Route path='/room/:name/news/create' exact component={CreatePost} />
      <Route path='/news' exact component={News} />
      <Route path='/news/:id' exact component={NewsDetail} />
      <Route path='/profile' exact component={Profile} />

      <Redirect from='/admin' to='/admin/dashboard' exact />
      <Route path='/admin/dashboard' exact component={Admin} />
      <Route path='/admin/rooms-manager' exact component={RoomsManager} />
      <Route path='/admin/users-manager' exact component={UsersManager} />
      <Route path='/admin/reports-manager' exact component={ReportsManager} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
