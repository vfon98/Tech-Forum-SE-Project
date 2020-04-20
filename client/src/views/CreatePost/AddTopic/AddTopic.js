import React, { Component } from 'react';
import CKEditor from '../CKEditor';
import './AddTopic.css';
import UploadFile from '../UploadFile/UploadFile';
import PostTopic from '../PostTopic/PostTopic';
import axios from 'axios';

class AddTopic extends Component{
  	constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		}

	  handleSubmit(){
	    const { title, body, author } = this.state;
	    return axios.post('http://localhost:9000/api/testapi', {
	      title,
	      body,
	    });
	  }

	  handleChangeField(key, event) {
	    this.setState({
	      [key]: event.target.value,
	    });
	  }
  	render(){
  	const { title, body } = this.state;
	  return(
	    <div className="wrapper">
	      <form>
		      <input name="title"  placeholder="Topic's title" onChange={this.handleTitleChange} className= 'input'
						onChange={(ev) => this.handleChangeField('title', ev)}
          	value={title}
		      />
		      <div className="editor-area">
		      	<CKEditor 
		      		onChange={(ev) => this.handleChangeField('body', ev)} 
		      		value={body}
		      	/>
		      </div>
		      <UploadFile />
		      <PostTopic  onClick={this.handleSubmit} />
	      </form>
	    </div>
	  );
  	}
}
export default AddTopic;
