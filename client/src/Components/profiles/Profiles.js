import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import { getProfiles } from "../../actions/profile";
import ProfileItems from "./ProfileItems";
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop' /> Browse and connect with
        developers
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItems key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>loading...</h4>
        )}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
