import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { createProfile, getCurrectProfile } from "../../actions/profile";
import { useEffect } from "react";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrectProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    age: "",
    location: "",
    status: "",
    bio: "",
    skills: "",
    githubusername: "",
    youtube: "",
    twitter: "",

    linkedin: "",
    instagram: "",
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  useEffect(() => {
    getCurrectProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      age: loading || !profile.age ? "" : profile.age,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      bio: loading || !profile.bio ? "" : profile.bio,
      skills: loading || !profile.skills ? "" : profile.skills,
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading]);
  const {
    company,
    website,
    age,
    location,
    status,
    bio,
    skills,
    githubusername,
    youtube,
    twitter,
    linkedin,
    instagram,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='medium text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-question-circle'></i> Tell us About yourself
      </p>
      <small>* = required fields</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value=''>* Select Your Professtional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student'>Student</option>
            <option value='Teacher'>Teacher</option>
            <option value='Intern'> Intern </option>
            <option value='Machine Learning'>Researcher</option>
            <option value='Others'> Others</option>
          </select>
          <small className='form-text'>
            *Give us an idea where your in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Age'
            name='age'
            value={age}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Give your age in numbers</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City and state suggested (eg . Mumbai, Maharastra)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='*skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            *Please use comma seperate values (eg. React,MongoDB,Node,Express)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='bio'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Tell us something about you</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Tell us Your github account name (eg: varunkumarnr)
          </small>
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrectProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrectProfile })(
  withRouter(EditProfile)
);
