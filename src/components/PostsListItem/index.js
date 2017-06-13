import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import styles from './PostsListItem.css';
import icons from '../../icons';
import { getImageSrc, getIframeUrl, extractIframe } from '../../Utils/helper';

export default class PostsListItem extends Component {
  static propTypes = {
    activatePost: PropTypes.func.isRequired,
    mode: PropTypes.string,
    post: PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    mode: '',
    post: {
      thumbnail: '',
    }
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
    const src = getImageSrc(post.thumbnail) ? post.thumbnail : 'android_asset/www/assets/noImageRetina.png';
    return (
      <div className={styles.postItemContainer}>
        <div className={styles.postItemContent}>
          <div className={styles.postHeader}>
            <img
              className={styles.postImage}
              src={src}
              alt=""/>
            <div className={styles.postTitle} dangerouslySetInnerHTML={this.createTitle()} ></div>
          </div>

          <div className={'created'}>{moment(post.date).format('MMMM Do, YYYY')}</div>
          <div className={styles.postsText} dangerouslySetInnerHTML={this.createExcerpt()} ></div>
        </div>
        {
          this.props.mode === '' &&
          <div>
            <div className={styles.readMore} onClick={() => { this.props.activatePost(post) }}
              >READ MORE
              <div className={styles.shareIcon}>
                <icons.Share />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}