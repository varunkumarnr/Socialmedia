import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { useState } from "react";

const Expirence = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDate, setToDate] = useState(false);

  const { title, company, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className='medium text-primary'>Add Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any of your developer or
        programming positons
      </p>
      <small>* = require field </small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='job title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            *Enter your job title (eg: Web Developer){" "}
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company/Work place name'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            *Enter your company name (eg: Code Buddy){" "}
          </small>
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
            Location (eg: Bangalore,Karnataka)
          </small>
        </div>
        <div className='form-group'>
          <h4>*From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                setToDate(!toDate);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4> To Date </h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={current}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go back
        </Link>
      </form>
    </Fragment>
  );
};

Expirence.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(Expirence));
