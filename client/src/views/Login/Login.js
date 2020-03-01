import React, { Component } from 'react';
import './Login.css';
import axios from '../../axios/instance';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }
  componentDidMount() {
    console.log(this.props)
  }


  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post('/users/login', {
        email,
        password,
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log({ err });
        this.setState({ error: 'Email or password is not valid !' });
      });
  };

  resetError = () => {
    this.setState({
      error: '',
    });
  };

  handleFBLogin = () => {
    console.log('ok');
    axios
      .get('/users/check')
      .then(res => console.log(res.data))
      .catch(err => console.log({ err }));
  };

  render() {
    return (
      <div className='wrapper'>
        <div className='login-title'>
          SIGN <span className='in'>IN</span>
        </div>
        <div className='form'>
          <form onSubmit={this.handleLogin}>
            <input
              className='input'
              type='email'
              placeholder='Email'
              required
              onInput={this.resetError}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <input
              className='input'
              type='password'
              placeholder='Password'
              required
              onInput={this.resetError}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
            <div className='error'>{this.state.error}</div>
            <input type='checkbox' /> <label className='lbl'>Remember Me</label>
            <button
             className='link'
             onClick={(e) => {
              e.preventDefault()
              this.props.handlePopup('register')
            }}>Register an account ?</button>
            <button className='button' type='submit' name='signin'>
              SIGN IN
            </button>
            <button type='button' onClick={this.handleFBLogin}>
              Sign in with Facebook
            </button>
            <a href='http://localhost:9000/auth/facebook'>With a</a>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
