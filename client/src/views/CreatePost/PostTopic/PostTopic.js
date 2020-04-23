import React, { Component } from 'react';
import './PostTopic.css';
import { CircularProgress } from '@material-ui/core';

class PostTopic extends Component {
  render() {
    const { isWaiting } = this.props;
    return (
      <div className='post-wrapper'>
        <button type='submit' className='button' disabled={isWaiting}>
          {isWaiting ? <CircularProgress color='primary' size={25} /> : 'Post'}
        </button>
        <button type='button' className='button' onClick={this.props.handlePreview}>
          Preview
        </button>
      </div>
    );
  }
}
export default PostTopic;
