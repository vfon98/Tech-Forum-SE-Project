import React from 'react'
import axios, { post } from 'axios';
import './UploadFile.css';

class UploadFile extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  //for only 1 file;
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <div>
        <label className='label'>Choose a thumbnail for topic:</label>
        <input className='input-upload' type="file" onChange={this.props.onFileChange} required />
        {/*<button type="submit">Upload</button>*/}
      </div>
   )
  }
}



export default UploadFile