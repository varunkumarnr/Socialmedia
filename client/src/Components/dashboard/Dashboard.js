import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrectProfile, deleteAccount } from "../../actions/profile";
import { useEffect } from "react";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import DisplayExperience from "./DisplayExperience";
import DisplayEducation from "./DisplayEducation";
import DashboardActions from "./dashboardactions";

const Dashboard = ({
  getCurrectProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrectProfile();
  }, [getCurrectProfile]);
  return loading && profile === null ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <div className='dashboard'>
        <div className='dashboard-left'>
          <p className='dashboard-welcome'>
            <i className='fas fa-user'> Welcome {user && user.name}</i>
          </p>
          <small className='username'>{user.username}</small>
        </div>
        <div className='dashboard-right'>
          <img className='dashboard-image' src={user.avatar} alt='avatar'></img>
        </div>
      </div>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <DisplayExperience experience={profile.experience} />
          <DisplayEducation education={profile.education} />
          <div className='mt-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete Account
            </button>
          </div>
          <small className='form-text'> This action cannot be re done </small>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Oops looks like you have not created your profile yet get started
          </p>
          <Link to='/create-profile' className='btn btn-primary'>
            create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrectProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrectProfile, deleteAccount })(
  Dashboard
);
