import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import { useState } from "react";

const Commentform = ({ postId, addComment }) => {
  const [text, setText] = useState(" ");
  return (
    <div>
      <div className='bg-light p'>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            addComment(postId, { text });
            setText("");
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Leave a Comment ... '
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </div>
  );
};

Commentform.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(Commentform);
