import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
export const Signup = () => {
  const [formData, setFormDate] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, username, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("password not equal");
    } else {
      //   const newUser = {
      //     name,
      //     username,
      //     email,
      //     password,
      //   };
      //   try {
      //     const config = {
      //       headers: {
      //         "Content-type": "application/json",
      //       },
      //     };
      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post("/api/users", body, config);
      //     console.log(res.data);
      //   } catch (err) {
      //     console.error(err.response.data);
      //   }
      console.log(formData);
    }
  };
  return (
    <Fragment>
      <div className='Login-page'>
        <div className='Login-page-right landing-inner'>
          <h1 className='loginpage-color'>Code Buddy</h1>
          <p className='lead signuplead'>
            Find your perfect Code buddy and make your dream team
          </p>
        </div>
        <div className='Login-page-left'>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Create Your Account
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='User name'
                name='username'
                value={username}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
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
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Signup' />
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
