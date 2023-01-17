import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../Action";

let Button = ({ getPosts, channel }) => {
  return (
    <button
      onClick={() => {
        getPosts(channel);
      }}
    >
      Get Top News
    </button>
  );
};
const mapStateToProps = (state) => ({ channel: state.channel });
const mapDispatchToProps = { getPosts: fetchPosts };
Button = connect(mapStateToProps, mapDispatchToProps)(Button);
export default Button;
