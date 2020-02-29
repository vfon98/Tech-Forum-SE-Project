import React, { Component } from 'react';
import axios from '../../axios/instance';
import './Register.css';
import { Link } from 'react-router-dom';
import FormError from '../../components/FormError';
import { validateInput, isDefined } from '../../utils';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
            email: {
                value: '',
                isInputValid: true, 
                errorMessage: ''
            },
            display_name: {
                value: '',
                isInputValid: true, 
                errorMessage: ''
            },
            password: {
                value: '',
                isInputValid: true, 
                errorMessage: ''
            },
            repass: {
                value: '',
                isInputValid: true, 
                errorMessage: ''
            },
            gender:{
              value: '',
              isInputValid: true,
              errorMessage: ''
            },
            address:{
              value: '',
              isInputValid: true,
              errorMessage: ''
            }

        }
    }



  handleInput = event => {
        const { name, value } = event.target;
        console.log(value);
        const newState = { ...this.state[name] };
        newState.value = value;
        this.setState({ [name]: newState });
    };

  handleInputValidation = event => {
        const { name } = event.target;
        const { isInputValid, errorMessage } = validateInput(name, this.state[name].value);
        const newState = { ...this.state[name] };
        newState.isInputValid = isInputValid;
        newState.errorMessage = errorMessage;
        this.setState({ [name]: newState })
  };
  

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
              name = "email"
              onChange={this.handleInput}
              onBlur={this.handleInputValidation}
            />
            <FormError
              type="email"
              isHidden={this.state.email.isInputValid} 
              errorMessage={this.state.email.errorMessage} 
            />

            <input
              className='input'
              type='text'
              placeholder='Display name'
              name = "display_name"
              onChange = {this.handleInput}
              onBlur = {this.handleInputValidation}
            />
            <FormError
              type="display_name"
              isHidden={this.state.display_name.isInputValid} 
              errorMessage={this.state.display_name.errorMessage} 
            />

            <input
              className='input'
              type='password'
              placeholder='Password'
              name = 'password'
              onChange={this.handleInput}
              onBlur ={this.handleInputValidation}
            />
            <FormError
              type='password'
              isHidden={this.state.password.isInputValid} 
              errorMessage={this.state.password.errorMessage} 
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
              onChange ={e => {
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
              name = "address"
              onChange={this.handleInput}
              onBlur={this.handleInputValidation}
            />
            <FormError
              type="address"
              isHidden={this.state.address.isInputValid} 
              errorMessage={this.state.address.errorMessage} 
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
