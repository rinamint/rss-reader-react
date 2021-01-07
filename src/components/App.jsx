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
    <footer className="footer border-top py-3 mt-5">
      <div className="container-xl">
        <div className="text-center">
          created by
          <a href="https://github.com/rinamint"> Arina Vaslyaeva</a>
        </div>
      </div>
    </footer>
  </div>
);

export default App;
