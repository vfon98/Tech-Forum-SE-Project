import React, { Component } from 'react';
import './Login.css';
class Login extends Component{
  render(){  
    return (
    <div className="wrapper">		
      	<div className="login-title"> 
      		SIGN <span className="in">UP</span>
      	</div>
    	<div className="form"> 
    		<form >
    			<input className="input" type="text" placeholder='Username' name="txtUsername"/>
    			<input className="input" type="password" placeholder='Password' name="txtPassword"/>
    			<input type="checkbox"/> <label className="lbl">Remember Me</label> <a href="#">Forgot your password?</a>
    			<button className="button" type="submit" name="signin">SIGN IN</button>
    		</form>
    	</div>
    </div>
    );
  }
}

export default Login;
