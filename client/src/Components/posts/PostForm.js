import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { useState } from "react";
const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  return (
    <div className='bg-light p'>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Type Something...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
