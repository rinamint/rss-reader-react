/* eslint-disable no-return-assign */
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions/index.js';

const addUrlState = handleActions({
  [actions.addUrlRequest]() {
    return 'requested';
  },
  [actions.addUrlSuccess]() {
    return 'finished';
  },
  [actions.addUrlFailure]() {
    return 'failed';
  },
}, 'none');

const data = handleActions({
  [actions.addUrlSuccess](state, { payload }) {
    const { feeds, posts } = state;
    return {
      feeds: [payload.channel, ...feeds],
      posts: [...payload.posts, ...posts],
    };
  },

  [actions.getPostsSuccess](state, { payload: newPosts }) {
    const { posts } = state;
    return {
      ...state,
      posts: [...newPosts, ...posts],
    };
  },

}, {
  feeds: [], posts: [],
});
const filter = handleActions({
  [actions.setPostsFilter](_state, { payload: { filterName } }) {
    return {
      currentFilterName: filterName,
    };
  },
}, { currentFilterName: 'all' });

const favorites = handleActions({
  [actions.toggleFavorite](state, { payload: id }) {
    const currentState = state[id].st;
    const mapping = {
      regular: 'favorite',
      favorite: 'regular',
    };
    return { ...state, [id]: { st: mapping[currentState] } };
  },
  [actions.addUrlSuccess](state, { payload }) {
    const { posts } = payload;
    const uiPosts = {};
    posts.map((post) => uiPosts[post.postId] = { st: 'regular' });
    return { ...uiPosts, ...state };
  },
  [actions.getPostsSuccess](state, { payload: newPosts }) {
    const uiPosts = {};
    newPosts.map((post) => uiPosts[post.postId] = { st: 'regular' });
    return { ...uiPosts, ...state };
  },
}, {});
export default combineReducers({
  addUrlState,
  data,
  filter,
  favorites,
  form: formReducer,
});
