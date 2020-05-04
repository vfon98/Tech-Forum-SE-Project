import React, { Component } from 'react';
import AddTopic from './AddTopic/AddTopic';
import NavBar from '../../components/NavBar';

class CreatePost extends Component {
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
        <AddTopic />
      </div>
    );
  }
}

export default CreatePost;
