import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index.js';

const filters = [['all', 'All Posts'], ['favorite', 'Favorite Posts']];

const mapStateToProps = (state) => {
  const { currentFilterName } = state.filter;
  return { currentFilterName };
};

const actionCreators = {
  setPostsFilter: actions.setPostsFilter,
};

const Filter = ({ setPostsFilter, currentFilterName }) => {
  const handleSetPostsFilter = (filterName) => () => {
    setPostsFilter({ filterName });
  };

  const renderFilter = ([state, name]) => {
    if (currentFilterName === state) {
      return name;
    }
    return (
      <button
        type="button"
        key={state}
        className={cn('btn', 'flex-item', 'btn-link', 'border-0 p-0', { 'text-danger': state === 'favorite' })}
        onClick={handleSetPostsFilter(state)}
      >
        {name}
      </button>
    );
  };

  return (
    <div className=" pb-3 pr-3 red d-flex flex-column align-items-end">
      {filters.map(renderFilter)}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Filter);
