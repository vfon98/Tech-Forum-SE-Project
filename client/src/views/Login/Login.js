import React, { Component } from 'react';
import './Login.css';
import { Button, Grid } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
import axios from '../../axios/instance';
import { setUser } from '../../utils/session';
import { parseLongDateFrom } from '../../utils/converter';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post('/users/login', {
        email,
        password,
      })
      .then(res => {
        console.log('Logged in');
        // Set user to session storage
        setUser({
          displayName: res.data.user.display_name,
          ...res.data.user,
          loginMethod: 'email',
        });
        this.props.handlePopup(null);
      })
      .catch(err => {
        // console.log({ err });
        const statusCode = err.response.status;
        switch (statusCode) {
          // Login failed
          case 401: {
            return this.setState({ error: 'Email or password is not valid !' });
          }
          // Account banned
          case 403: {
            const expiredDate = err.response.data.ban_expired_at;
            return this.setState({
              error: `You've been banned until ${parseLongDateFrom(expiredDate)}`,
            });
          }
        }
      });
  };

  resetError = () => {
    this.setState({
      error: '',
    });
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
              type='button'
              className='link'
              onClick={e => {
                e.preventDefault();
                this.props.handlePopup('register');
              }}
            >
              Register an account ?
            </button>
            <Grid container spacing={2}>
              <Grid item>
                <Button className='button' type='submit' variant='contained'>
                  SIGN IN
                </Button>
              </Grid>
              <Grid item>
                <Button
                  href='http://localhost:9000/auth/facebook'
                  variant='contained'
                  color='primary'
                  startIcon={<Facebook />}
                >
                  Continue with Facebook
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
