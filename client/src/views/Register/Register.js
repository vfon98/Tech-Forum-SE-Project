import React, { Component } from 'react';
import axios from '../../axios/instance';
import './Register.css';
import { Link } from 'react-router-dom';

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
  }

  handleRegister = e => {
    e.preventDefault();
    console.log(this.state);
    const { email, password, display_name, gender } = this.state;
    axios
      .post('users/register', {
        email,
        password,
        display_name,
        gender,
      })
      .then(res => {
        // No error
        if (!res.data.err) {
          this.props.history.push('/login');
        }
        // Has error
        this.setState({ error: res.data.err });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className='wrapper'>
        <div className='title'>
          SIGN<span className='in'> UP</span>
        </div>
        <div className='form'>
          <form onSubmit={this.handleRegister} encType='multipart/form-data'>
            <input
              className='input'
              type='text'
              placeholder='Email'
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            {
              <div className="error"></div>
            }
            <input
              className='input'
              type='text'
              placeholder='Display name'
              onChange={e => {
                this.setState({ display_name: e.target.value });
              }}
            />
            <input
              className='input'
              type='password'
              placeholder='Password'
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
            <input
              className='input'
              type='password'
              placeholder='Confirm Password'
              onChange={e => {
                this.setState({ repass: e.target.value });
              }}
            />
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
            <input className='input' type='file' />
            <input
              className='input'
              type='text'
              placeholder='Your address'
              onChange={e => {
                this.setState({ address: e.target.value });
              }}
            />
            <Link to='/login'>Sign in now!</Link>
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
