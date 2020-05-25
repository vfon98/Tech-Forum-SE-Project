import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import Router
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import history from './utils/history';

//Import view of this product
import Homepage from './views/Homepage/Homepage.jsx';
import Discussion from './views/Discussion/Discussion';
import Room from './views/Room/Room';
import Wall from './views/Wall/Wall';
import NewsDetail from './views/NewsDetail/NewsDetail';
import RoomNews from './views/RoomNews/RoomNews';
import News from './views/News/News';
import CreatePost from './views/CreatePost/CreatePost';
import UpdateTopic from './views/CreatePost/UpdatePost';
import Admin from 'views/Admin/Admin';
import RoomsManager from 'views/Admin/RoomsManager/RoomsManager';
import UsersManager from 'views/Admin/UsersManager/UsersManager';
import ReportsManager from 'views/Admin/ReportsManager/ReportsManager';
import PostDetail from 'views/PostDetail/PostDetail';
import ProfilePage from 'views/Profile/ProfilePage';
import Footer from 'components/Footer';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Homepage} />
      <Route path='/discussion' exact component={Discussion} />
      <Route path='/room/:name' exact component={Room} />
      <Route path='/room/:name/news' exact component={RoomNews} />
      <Route path='/room/:name/news/create' exact component={CreatePost} />
      <Route path='/news/:id/update' exact component={UpdateTopic} />   
      <Route path='/news' exact component={News} />
      <Route path='/news/:id' exact component={NewsDetail} />
      <Route path='/posts/:id' exact component={PostDetail} />
      <Route path='/wall/' render={(props) => (
        <Wall {...props} />
      )} />
      <Route path='/profile/' render={(props) => (
        sessionStorage.user ? <ProfilePage {...props} /> : <Redirect to='/' />
      )} />
      {/* Admin routes */}
      <Redirect from='/admin' to='/admin/dashboard' exact />
      <Route path='/admin/dashboard' exact component={Admin} />
      <Route path='/admin/rooms-manager' exact component={RoomsManager} />
      <Route path='/admin/users-manager' exact component={UsersManager} />
      <Route path='/admin/reports-manager' exact component={ReportsManager} />
    </Switch>
    <Footer />
  </Router>,
  document.getElementById('root')
);
