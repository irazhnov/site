import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import classnames from 'classnames';
import styles from './PostContent.css';
import icons from '../../icons';
import  { EDITOR_CATEGORY } from '../../containers/IntroApp/constants';
import { getImageSrc, extractIframe } from '../../Utils/helper';

export default class PostsContent extends Component {
  static propTypes = {
    returnToList: PropTypes.func.isRequired,
    mode: PropTypes.string,
    post: PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
      url:PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    post: {
      thumbnail: '',
      date: {},
    },
  };

  constructor(props) {
    super(props);
    this.createContent = ::this.createContent;
    this.createTitle = ::this.createTitle;
//     this.clickHandler = ::this.clickHandler;
  }

//   componentDidMount() {
//     const videoButton = document.getElementById('videoButton');
//     if (videoButton) {
//       videoButton.addEventListener('click' , this.clickHandler);
//     }
//   }
//
//   componentWillUnmount() {
//     const videoButton = document.getElementById('videoButton');
//     if (videoButton) {
//       videoButton.removeEventListener('click' , this.clickHandler);
//     }
//   }

//   clickHandler() {
//     console.warn('clickHandler');
//     const videoUrl = getIframeUrl(this.props.post.content);
//     if (videoUrl) {
//       const options = {
//         successCallback: function () {
//           console.warn("Video was closed without error.");
//         },
//         errorCallback: function (errMsg) {
//           console.warn("Error! " + errMsg);
//         },
//         orientation: 'landscape',
//         shouldAutoClose: true,  // true(default)/false
//         controls: true
//       };
// //       window.plugins.streamingMedia.playVideo('rtsp://mpv.cdn3.bigCDN.com:554/bigCDN/_definst_/mp4:bigbuckbunnyiphone_400.mp4', options);
//     }
//   }

  createTitle() {
    return {
      __html: this.props.post.title_plain,
    }
  };

  createContent() {
    const content = this.props.post.content ? extractIframe(this.props.post.content, this.props.post.url, this.props.post.title_plain) : '';

    return {
      __html: content,
    }
  };

  render () {
    const { post } = this.props;
    const src = getImageSrc(post.thumbnail) ? post.thumbnail : 'android_asset/www/assets/noImageRetina.png';
    return (
      <div className={styles.postPageContainer}>
        <button className={styles.backButton} onClick={() => { this.props.returnToList() }}
        ><icons.NavArrow /><span>BACK</span></button>
        <div className={styles.postContainer}>
          { post && post.categories && post.categories[0].slug !== EDITOR_CATEGORY &&
          <div className={styles.imageContainer}>
            <img src={src}
                 alt=""/>
          </div>
          }
          <div className={styles.contentContainer} >
            { post && post.categories && post.categories[0].slug !== EDITOR_CATEGORY &&
            <div className={styles.titleContent} dangerouslySetInnerHTML={this.createTitle()} ></div>
            }
            <div className={classnames('created', styles.created)}>{moment(post.date).format('MMMM Do, YYYY')}</div>
            <div className={styles.content} dangerouslySetInnerHTML={this.createContent()} ></div>
          </div>
        </div>
      </div>
    )
  }
}