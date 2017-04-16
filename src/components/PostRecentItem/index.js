import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import styles from '../PostsListItem/PostsListItem.css';

export default class PostsListItem extends Component {
  static propTypes = {
    activatePost: PropTypes.func.isRequired,
    mode: PropTypes.string,
    recent: PropTypes.shape({
      category: PropTypes.shape({
        post_count: PropTypes.number.isRequired,
      }),
      pages: PropTypes.number,
      count: PropTypes.number,
      posts: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        thumbnail:PropTypes.string.isRequired,
        title_plain:PropTypes.string.isRequired,
        excerpt:PropTypes.string.isRequired,
        content:PropTypes.string.isRequired,
      }))
    }),
//     post: PropTypes.shape({
//       id:PropTypes.string.isRequired,
//       thumbnail:PropTypes.string.isRequired,
//       title_plain:PropTypes.string.isRequired,
//       excerpt:PropTypes.string.isRequired,
//       content:PropTypes.string.isRequired,
//     }).isRequired,
  };

  static defaultProps = {
    mode: '',
  };

  constructor(props) {
    super(props);
    this.createExcerpt = ::this.createExcerpt;
    this.createTitle = ::this.createTitle;
  }

  createTitle(post) { return {__html: post.title_plain}; };
  createExcerpt(post) { return this.props.mode === '' ? {__html: post.excerpt} : {__html: post.content}; };

  render () {
    const post = this.props.recent ? this.props.recent.posts[0] : {};
    return (
      <div className={styles.postItemContainer}>
        <div className={styles.postItemContent}>
          <div className={styles.editorHeader}>
            <img
              className={styles.postImage}
              src={post.thumbnail}
              alt=""/>
            <div className={styles.postTitle} dangerouslySetInnerHTML={this.createTitle(post)} ></div>
          </div>

          <div className={'created'}>{moment(post.date).format('MMMM Do, YYYY')}</div>
          <div className={styles.postsText} dangerouslySetInnerHTML={this.createExcerpt(post)} ></div>
        </div>
        {
          this.props.mode === '' &&
          <button className={styles.readMore} onClick={() => { this.props.activatePost(post) }}
          >READ MORE</button>
        }
      </div>
    )
  }
}