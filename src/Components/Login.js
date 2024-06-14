import React from 'react';
import './LoginPage.css';

const LoginPage = (props) => {
  const msgClass = ['text-center'];
  if(props.type){
    msgClass.push('text-success')
  }
  else{
    msgClass.push('text-danger')
  }
  return (
    
    <form className='login-container' onSubmit={props.login}>
       <p className={msgClass.join('')} style={{ color: 'green' }}>
                {props.message}
       </p> 
      <h2>Login Page</h2>
      <label>
       Email-Id:
        <input type="text"
        name='email' />
      </label>
      <br />
      <label>
        Password:
        <input type="password" 
        name='password'/>
      </label>
      <br />
      <button>Login</button>
     <p>
      <a href="" onClick={props.switch}> Create </a> an Account
     </p>
    </form>
  );
};

export default LoginPage;


// type={this.state.type}
// message={this.state.message}

// this.setState({message:error.message, type:0})})
