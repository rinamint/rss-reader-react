import { createAction } from 'redux-actions';
import _ from 'lodash';
import axios from 'axios';
import parsing from '../utils';

export const addUrlRequest = createAction('ADD_URL_REQUEST');
export const addUrlSuccess = createAction('ADD_URL_SUCCESS');
export const addUrlFailure = createAction('ADD_URL_FAILURE');

export const toggleFavorite = createAction('TOGGLE_FAVORITE');
export const setPostsFilter = createAction('POSTS_FILTER_SET');

export const getPostsRequest = createAction('GET_POSTS_REQUEST');
export const getPostsSuccess = createAction('GET_POSTS_SUCCESS');
export const getPostsFailure = createAction('GET_POSTS_FAILURE');

export const getNewPosts = (feeds, oldPosts) => async (dispatch) => {
  dispatch(getPostsRequest());
  try {
    Promise.allSettled(feeds.map(async ({ url, id }) => {
      const corsApiHost = 'https://cors-anywhere.herokuapp.com/';
      const response = await axios.get(`${corsApiHost}${url}`);
      const { posts } = await parsing(response.data, url);
      const onlyFeedPosts = oldPosts.filter((post) => post.feedId === id);
      const newPosts = _.differenceBy(posts, onlyFeedPosts, 'link')
        .map((post) => ({ ...post, feedId: id }));
      dispatch(getPostsSuccess(newPosts));
    }));
  } catch (e) {
    console.log(e);
    dispatch(getPostsFailure());
  }
};

export const addUrl = (url) => async (dispatch) => {
  dispatch(addUrlRequest());
  try {
    const corsApiHost = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.get(`${corsApiHost}${url}`);
    const { channel, posts } = await parsing(response.data, url);
    dispatch(addUrlSuccess({ channel, posts }));
  } catch (e) {
    console.log(e);
    dispatch(addUrlFailure());
  }
};
