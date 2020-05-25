import React, { Component } from 'react';
import UpdateTopic from './UpdateTopic/UpdateTopic';
import NavBar from '../../components/NavBar';

class UpdatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null
    }
  }

  render() {
    return (
      <div className='top-app'>
        <NavBar isLogin={(isLogin) => this.setState({isLogin})} />
        <UpdateTopic />
      </div>
    );
  }
}

export default UpdatePost;
