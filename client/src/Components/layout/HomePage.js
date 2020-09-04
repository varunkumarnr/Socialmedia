import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className='HomePage'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Code Buddy</h1>
          <p className='lead'>
            Find your perfect Code buddy and design your dream project
          </p>
          <div className='buttons'>
            <Link to='' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='' className='btn btn-Light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
