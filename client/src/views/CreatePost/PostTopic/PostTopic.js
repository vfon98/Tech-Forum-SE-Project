import React, { Component } from 'react';
import './PostTopic.css';

class PostTopic extends Component{
  render(){
	  return(
	    <div className="wrapper">
	      <button type="submit" className="button">Post</button>
	      <button type="button" className="button">Preview</button>
	    </div>
	  );
  	}
}
export default PostTopic;