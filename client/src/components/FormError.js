import React, { Component } from 'react';


function FormError(props){
	const err = {
      color: "white",
    };
      /* nếu isHidden = true, return null ngay từ đầu */
      if (props.isHidden) { return null;}
      return ( <div style={err}>{props.errorMessage}</div>)
}
export default FormError;