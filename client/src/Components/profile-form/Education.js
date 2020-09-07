import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profile";
import { connect } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Education = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    University: "",
    Degreefield: "",
    from: "",
    to: "",
    current: false,
    description: "",
    GPA: "",
  });
  const [toDate, setToDate] = useState(false);
  const {
    University,
    Degreefield,
    from,
    to,
    current,
    description,
    GPA,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className='medium text-primary'>Add Education</h1>
      <p className='lead'>Tell us about you educational background</p>
      <small>* = require field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='*University name'
            name='University'
            value={University}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='*Field'
            name='Degreefield'
            value={Degreefield}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <h4>*From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
            required
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
            Currently Studying
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
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
            placeholder='Tell us something about your education..'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='GPA'
            placeholder='GPA/4'
            value={GPA}
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

Education.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(Education);
