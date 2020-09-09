import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../../Components/layout/Loading";
import { getPost } from "../../actions/post";
import { useEffect } from "react";
import PostItem from "../../Components/posts/PostItem";
import { Link } from "react-router-dom";
import Commentform from "./Commentform";
import CommentItem from "./CommentItem";
const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn btn-light'>
        {" "}
        Go back{" "}
      </Link>
      <PostItem post={post} showActions={false}>
        {" "}
      </PostItem>
      <Commentform postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
