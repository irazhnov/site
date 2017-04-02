import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import styles from './PostsListItem.css';

export default class PostsListItem extends Component {
  static propTypes = {
    activatePost: PropTypes.func.isRequired,
    mode: PropTypes.string,
    post: PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string.isRequired,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    mode: '',
  };

  constructor(props) {
    super(props);
    this.createExcerpt = ::this.createExcerpt;
    this.createTitle = ::this.createTitle;
  }

  createTitle() { return {__html: this.props.post.title_plain}; };
  createExcerpt() { return this.props.mode === '' ? {__html: this.props.post.excerpt} : {__html: this.props.post.content}; };

  render () {
    const { post } = this.props;
    return (
      <div className={styles.postItemConteainer}>
        <img src={post.thumbnail}
             alt=""/>
        <div dangerouslySetInnerHTML={this.createTitle()} ></div>
        <div className={'created'}>{moment(post.date).format('MMMM Do, YYYY')}</div>
        <div dangerouslySetInnerHTML={this.createExcerpt()} ></div>
        {
          this.props.mode === '' &&
          <button className={styles.readMore} onClick={() => { this.props.activatePost(post) }}
          >READ MORE</button>
        }
      </div>
    )
  }
}