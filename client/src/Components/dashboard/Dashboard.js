import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrectProfile } from "../../actions/profile";
import { useEffect } from "react";

const Dashboard = ({ getCurrectProfile, auth, profile }) => {
  useEffect(() => {
    getCurrectProfile();
  }, []);
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrectProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrectProfile })(Dashboard);
