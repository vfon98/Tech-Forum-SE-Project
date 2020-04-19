import React, { Component } from 'react';
import AddTopic from './AddTopic/AddTopic';
import AddPoll from './AddPoll/AddPoll';

class CreatePost extends Component{
  render(){
    return (
      <div className="App">
        <h1>Create Topic</h1>
        <p>News, events all over the world of technology.</p>
        <AddTopic />
      </div>
    );
  }
}

export default CreatePost;
