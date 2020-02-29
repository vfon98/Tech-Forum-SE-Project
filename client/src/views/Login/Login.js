import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';


class Login extends Component {

	handleLogin = (e) => {
		e.preventDefault();
	}

	render() {
		return (
			<div className="wrapper">
				<div className="login-title">
					SIGN <span className="in">IN</span>
				</div>
				<div className="form">
					<form onSubmit={this.handleLogin}>
						<input className="input" type="text" placeholder='Username' name="txtUsername" />
						<input className="input" type="password" placeholder='Password' name="txtPassword" />
						<input type="checkbox" /> <label className="lbl">Remember Me</label>
						<button onClick={() => this.props.handlePopup('register')}>Register an account ?</button>
						<button className="button" type="submit" name="signin">SIGN IN</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
