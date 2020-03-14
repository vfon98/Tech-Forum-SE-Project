import React, { Component } from 'react';
import axios from '../../axios/instance';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      display_name: '',
      password: '',
      repass: '',
      gender: 'male',
      address: '',
      error: null,
    };
    this.fileRef = React.createRef();
  }

  handleRegister = e => {
    e.preventDefault();
    // Password check
    if (!this.isPasswordMatched()) return;
    //
    const { email, password, display_name, gender } = this.state;
    const body = new FormData();
    body.append('avatar', this.fileRef.current.files[0]);
    body.append('email', email);
    body.append('password', password);
    body.append('display_name', display_name);
    body.append('gender', gender);
    axios
      .post('/users/register', body, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.data);
        // No error
        if (!res.data.err) {
          this.props.handlePopup('login');
        }
        // Has error
        this.setState({ error: res.data.err });
      })
      .catch(err => {
        console.log(err);
      });
  };

  isPasswordMatched = () => {
    let { password, repass } = this.state;
    return password === repass;
  };

  render() {
    const { error } = this.state;
    return (
      <div className='wrapper'>
        <div className='title'>
          SIGN<span className='in'> UP</span>
        </div>
        <div className='form'>
          <form onSubmit={this.handleRegister} encType='multipart/form-data'>
            <input
              className='input'
              type='email'
              placeholder='Email'
              required
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            {error && error.email ? (
              <div className='error'>Email is already used</div>
            ) : (
              ''
            )}
            <input
              className='input'
              type='text'
              placeholder='Display name'
              minLength='3'
              maxLength='20'
              required
              onChange={e => {
                this.setState({ display_name: e.target.value });
              }}
            />
            {error && error.display_name ? (
              <div className='error'>This name is existed</div>
            ) : (
              ''
            )}
            <input
              className='input'
              type='password'
              placeholder='Password'
              minLength='4'
              required
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
            <input
              className='input'
              type='password'
              minLength='4'
              required
              placeholder='Confirm Password'
              onChange={e => {
                this.setState({ repass: e.target.value });
              }}
            />
            {!this.isPasswordMatched() ? (
              <div className='error'>Password does not match</div>
            ) : (
              ''
            )}
            <label className='single-lbl'>Gender</label>
            <input
              className='radio-button'
              type='radio'
              value='male'
              name='gender'
              checked={this.state.gender === 'male'}
              onChange={e => {
                this.setState({ gender: e.target.value });
              }}
            />
            <label className='lbl'>Male</label>
            <input
              className='radio-button'
              type='radio'
              value='female'
              name='gender'
              checked={this.state.gender === 'female'}
              onChange={e => {
                this.setState({ gender: e.target.value });
              }}
            />
            <label className='lbl'>Female</label>
            <label className='single-lbl'>Choose your avatar</label>
            <input
              type='file'
              className='input'
              name='avatar'
              accept='image/*'
              ref={this.fileRef}
              onChange={this.handleUploadAvatar}
            />
            <input
              className='input'
              type='text'
              placeholder='Your address'
              onChange={e => {
                this.setState({ address: e.target.value });
              }}
            />
            <button
              type='button'
              className='link'
              onClick={e => {
                e.preventDefault();
                this.props.handlePopup('login');
              }}
            >
              Sign in now!
            </button>
            <button className='button' type='submit'>
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
