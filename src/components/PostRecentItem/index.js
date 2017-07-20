import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import classnames from 'classnames';
import stylesList from '../PostsListItem/PostsListItem.css';
import styles from './PostRecentItem.css';
import { getImageSrc, getIframeUrl, extractIframe, getFallbackImage } from '../../Utils/helper';

export default class PostRecentItem extends Component {
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
    const { post } = this.props;
    const src = getImageSrc(post.thumbnail) ? post.thumbnail : getFallbackImage();

    return (
      <div className={stylesList.postItemContainer} >
        <div className={stylesList.postItemContent}>
          <div className={styles.imageContainer}>
            <img
              className={styles.postImage}
              src={src}
              alt=""/>
          </div>
          <div className={stylesList.postTitle} dangerouslySetInnerHTML={this.createTitle(post)} ></div>
          <div className={classnames('created', styles.created)}>{moment(post.date).format('MMMM Do, YYYY')}</div>
          {/*<div className={stylesList.postsText} dangerouslySetInnerHTML={this.createExcerpt(post)} ></div>*/}
        </div>
        {
          this.props.mode === '' &&
          <button className={stylesList.readMore} onClick={() => { this.props.activatePost(post) }}
          >READ MORE</button>
        }
      </div>
    )
  }
}