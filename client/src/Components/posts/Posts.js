import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import { getPosts } from "../../actions/post";
import { useEffect } from "react";
import PostItem from "./PostItem";
import PostFrom from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='medium text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'> </i>
        Welcome to community check what is being discussed
      </p>
      <PostFrom />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
