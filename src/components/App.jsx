import React from 'react';
import Form from './Form.jsx';
import Posts from './Posts.jsx';
import Feeds from './Feeds.jsx';
import Filter from './Filter.jsx';

const App = () => (
  <div>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4 heading">RSS Reader</h1>
        <p className="lead">Find the best source of information</p>
        <Form />
        <p className="text-muted my-1"> Example: http://lorem-rss.herokuapp.com/feed </p>
      </div>
    </div>
    <Feeds />
    <Filter />
    <Posts />
  </div>
);

export default App;
