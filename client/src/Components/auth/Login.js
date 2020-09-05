import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormDate] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    console.log("loggedin");
  };
  return (
    <Fragment>
      <div className='Login-page'>
        <div className='Login-page-right landing-inner'>
          <h1 className='loginpage-color'>Code Buddy</h1>
          <p className='lead signuplead'>Join the community of coders</p>
        </div>
        <div className='Login-page-left'>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Create Your Account
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='E-mail'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <small className='form-text'>
                This site uses Gravator so make sure your Email as image
              </small>
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
          </form>
          <p className='my-1'>
            Do not have an account? <Link to='/signup'>Signin</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
