import React from 'react';
import './Register.css';
function Register(props) {

const msgClass = ['text-center'];
  if(props.type){
    msgClass.push('text-success')
  }
  else{
    msgClass.push('text-danger')
  }


  return (
    <div className='login-container'>
      <h1>Registration Page</h1>
      <p className={msgClass.join('')} style={{ color: 'red' }}>
        {props.message}
      </p>
      <form onSubmit={props.register}>
        {/* <label>
          Username:
          <input type="text" />
        </label> */}
        <br />
        <label>
          Email:
          <input type="email"
            name='email'
          />
        </label>
        <br />
        <label>
          Password:
          <input type="password"
            name='password' />
        </label>
        <br />
        <label>
          Confirm-Password:
          <input type="password"
            name='confirmPassword' />
        </label>
        <br />
        <button type="submit">Register</button>
        <p>
          Have an account?
          <a href="#" onClick={props.switch}>Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
