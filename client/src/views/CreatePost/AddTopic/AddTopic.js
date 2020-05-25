import React, { Component } from 'react';
import CKEditor from '../CKEditor';
import './AddTopic.css';
import UploadFile from '../UploadFile/UploadFile';
import PostTopic from '../PostTopic/PostTopic';
import axios from 'axios/instance';
import { withRouter } from 'react-router-dom';
import { isAuthenticated } from 'utils/session';
import PreviewPopup from './PreviewPopup';

class AddTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: '',
      content: '',
      file: null,
      isWaiting: false,
      isOpenPreview: false,
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!isAuthenticated()) return;
    const { header, content, file } = this.state;
    if (content === '') return alert('Content required');
    // Display a loading button
    this.setState({ isWaiting: true });
    const { params } = this.props.match;
    const formData = new FormData();
    formData.append('header', header);
    formData.append('content', content);
    formData.append('thumbnail', file);
    formData.append('roomName', params.name);
    axios
      .post('/news', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(() => {
        this.setState({ isWaiting: false });
        this.props.history.goBack();
      })
      .catch(err => console.log({ err }));
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleFileChange = e => {
    this.setState({
      file: e.target.files[0],
    });
  };

  togglePreview = () => {
    this.setState({
      isOpenPreview: !this.state.isOpenPreview,
    });
  };

  render() {
    const { header, content, isWaiting, isOpenPreview } = this.state;
    return (
      <div className='ck-wrapper'>
        <h1>Create Topic</h1>
        <p>News, events all over the world of technology.</p>
        <form
          onSubmit={this.handleSubmit}
          className='form-wrapper'
          method='POST'
        >
          <input
            name='header'
            placeholder="Topic's header"
            className='ck-input'
            onChange={ev => this.handleChangeField('header', ev)}
            value={header}
            required
          />
          <div className='editor-area'>
            <CKEditor
              onChange={ev => this.handleChangeField('content', ev)}
              value={content}
              getData={data => this.setState({ content: data })}
            />
          </div>
          <UploadFile onFileChange={this.handleFileChange} />
          <PostTopic isWaiting={isWaiting} handlePreview={this.togglePreview} />
          <PreviewPopup
            isOpen={isOpenPreview}
            onClose={this.togglePreview}
            header={header}
            content={content}
          />
        </form>
      </div>
    );
  }
}
export default withRouter(AddTopic);
