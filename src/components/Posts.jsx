import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import heart from '../heart.svg';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { posts } = state.data;
  const { favorites, filter } = state;
  const filteredPosts = filter.currentFilterName === 'all' ? posts : posts.filter((post) => favorites[post.postId].st === 'favorite');
  const props = { filteredPosts, favorites };
  return props;
};

const actionCreators = {
  toggleFavorite: actions.toggleFavorite,
};

const Posts = ({ filteredPosts, favorites, toggleFavorite }) => {
  if (filteredPosts.length < 1) {
    return null;
  }
  const handleClick = (id) => () => {
    toggleFavorite(id);
  };
  const btnClass = (id) => (favorites[id].st === 'regular' ? 'btn-outline-danger' : 'btn-danger');
  return (
    <div className="col-md-10 col-lg-8 mx-auto">
      <ul className="list-group post-list">
        <h2> Posts </h2>
        {filteredPosts.map((post) => (
          <li key={post.postId} className="list-group-item d-flex justify-content-between align-items-start">
            <a href={post.link} rel="noopener noreferrer" target="_blank">{post.title}</a>
            <button onClick={handleClick(post.postId)} type="button" className={cn('btn', btnClass(post.postId))}>
              <img alt="favorite" src={heart} style={{ display: 'block' }} />
            </button>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default connect(mapStateToProps, actionCreators)(Posts);
