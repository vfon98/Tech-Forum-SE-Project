import React, { Component } from 'react';
import './Register.css';
import { Link } from 'react-router-dom'

class Register extends Component{
  render(){  
    return (
    <div className="wrapper">		
      	<div className="title"> 
      		 SIGN<span className="in"> UP</span>
      	</div>
    	<div className="form"> 
    		<form>
          <input className="input" type="text" placeholder='Username' name="txtUsername"/>
          <input className="input" type="text" placeholder='Email' name="txtEmail"/>
    			<input className="input" type="password" placeholder='Password' name="txtPassword"/>
          <input className="input" type="password" placeholder='Confirm Password' name="txtRePassword"/>
          <label className="single-lbl">Gender</label>
          <input className="radio-button" type="radio" value="Male" name="gender"/><label className="lbl">Male</label>   			
          <input className="radio-button" type="radio" value="Famale" name="gender"/><label className="lbl">Famale</label>        
          <label className="single-lbl">Choose your avatar</label>
          <input className="input" type="file" />
          <input className="input" type="password" placeholder='Your address' name="txtAddress"/>          
          <Link to='/login'>Sign in now!</Link>
    			<button className="button" type="submit" name="signup">SIGN UP</button>
    		  
        </form>
    	</div>
    </div>
    );
  }
}

export default Register;
