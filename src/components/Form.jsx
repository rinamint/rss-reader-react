/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import cn from 'classnames';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { feeds, posts } = state.data;
  const props = {
    feeds,
    posts,
  };
  return props;
};

const actionCreators = {
  addUrl: actions.addUrl,
  getNewPosts: actions.getNewPosts,
};

const validate = (values) => {
  const errors = {};
  const isUrlValid = (userInput) => {
    const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
    if (res === null) {
      return (false);
    }
    return (true);
  };
  if (values.url) {
    if (!isUrlValid(values.url)) {
      errors.url = 'Insert a valid URL';
    }
  }

  return errors;
};
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  <div>
    <div>
      <input {...input} placeholder={label} className={cn('form-control', 'form-control-lg', 'w-150', { 'is-invalid': (error) })} type={type} />
      {touched
        && ((error && <div className={cn({ 'invalid-feedback': true })}>{error}</div>)
        )}
    </div>
  </div>
);

class Form extends React.Component {
  componentDidMount() {
    const { getNewPosts } = this.props;
    this.timerID = setInterval(() => getNewPosts(this.props.feeds, this.props.posts), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

   handleRequest = (values) => {
     const { feeds } = this.props;
     const urls = feeds.map((feed) => feed.url);
     console.log(urls, values);
     if (urls.includes(values.url)) {
       throw new SubmissionError({
         url: 'This url has been added',
       });
     }
     const { url } = values;
     const { addUrl, reset } = this.props;
     addUrl(url);
     reset();
   }

   render() {
     const { handleSubmit, pristine, submitting } = this.props;
     return (
       <form onSubmit={handleSubmit(this.handleRequest)}>
         <label htmlFor="url">add new URL</label>
         <div className="form-row">
           <div className="col">
             <Field name="url" aria-label="url" type="text" component={renderField} label="url" />
             <div className="feedback"> </div>
           </div>
           <div className="col-auto">
             <button type="submit" aria-label="add" className="btn btn-lg btn-primary px-sm-5 btn-add" disabled={pristine || submitting}>Add</button>
           </div>
         </div>
       </form>

     );
   }
}
const ConnectedRssForm = connect(mapStateToProps, actionCreators)(Form);
export default reduxForm({ form: 'NewRssForm', validate })(ConnectedRssForm);
