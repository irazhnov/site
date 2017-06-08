import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import styles from './PostContent.css';
import icons from '../../icons';
import  { EDITOR_CATEGORY } from '../../containers/IntroApp/constants';


export default class PostsLContent extends Component {
  static propTypes = {
    returnToList: PropTypes.func.isRequired,
    mode: PropTypes.string,
    post: PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
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
  }

  createTitle() { return {__html: this.props.post.title_plain };};
  createContent() {
    return {
      __html: this.props.post.content };};

  render () {
    const { post } = this.props;
    return (
      <div className={styles.postPageContainer}>
        <button className={styles.backButton} onClick={() => { this.props.returnToList() }}
        ><icons.NavArrow /><span>BACK</span></button>
        <div className={styles.postContainer}>
          { post && post.categories && post.categories[0].slug !== EDITOR_CATEGORY &&
          <div className={styles.imageContainer}>
            <img src={post.thumbnail}
                 alt=""/>
          </div>
          }
          <div className={styles.contentContainer}>
            <div className={styles.titleContent} dangerouslySetInnerHTML={this.createTitle()} ></div>
            <div className={'created'}>{moment(post.date).format('MMMM Do, YYYY')}</div>
            <div dangerouslySetInnerHTML={this.createContent()} ></div>
          </div>
        </div>
      </div>
    )
  }
}