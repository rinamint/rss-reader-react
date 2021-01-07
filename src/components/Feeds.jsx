import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { feeds } = state.data;
  const props = { feeds };
  return props;
};

const Feeds = ({ feeds }) => {
  if (feeds.length <= 0) {
    return null;
  }
  return (
    <div className="col-md-10 col-lg-8 mx-auto">
      <ul className="list-group mb-5 feed-list">
        <h2> Feeds </h2>
        {feeds.map((feed) => (
          <li key={feed.id} className="list-group-item">
            <h3>{feed.channelName}</h3>
            <p>{feed.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(Feeds);
