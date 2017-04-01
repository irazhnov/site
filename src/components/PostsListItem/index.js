import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import styles from './PostsListItem.css';

export default class PostsListItem extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string.isRequired,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.createMarkup = ::this.createMarkup;
    this.createTitle = ::this.createTitle;
  }

  createTitle() { return {__html: this.props.post.title_plain}; };
  createMarkup() { return {__html: this.props.post.excerpt}; };

  render () {
    const { post } = this.props;
    return (
      <div>
        <img src={post.thumbnail}
             alt=""/>
        <div dangerouslySetInnerHTML={this.createTitle()} ></div>
        <div className={styles.created}>{moment(post.date).format('MMMM Do, YYYY')}</div>
        <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
        <button className={styles.readMore}>READ MORE</button>
      </div>
    )
  }
}