import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const DisplayEducation = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.University}</td>
      <td className='hide-sm'>{edu.Degreefield}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-1'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>University</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm '>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

DisplayEducation.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(DisplayEducation);
