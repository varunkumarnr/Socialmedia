import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const HomePage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='HomePage'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Code Buddy</h1>
          <p className='lead'>
            Find your perfect Code buddy and make your dream team
          </p>
          <div className='buttons'>
            <Link to='/signup' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-Light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
HomePage.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToprops)(HomePage);
