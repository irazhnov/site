import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import styles from './PostContent.css';
import icons from '../../icons';

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
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.createContent = ::this.createContent;
    this.createTitle = ::this.createTitle;
  }

  createTitle() { return {__html: this.props.post.title_plain };};
  createContent() { return {__html: this.props.post.content };};

  render () {
    const { post } = this.props;
    return (
      <div>
        <button className={styles.backButton} onClick={() => { this.props.returnToList() }}
        ><icons.NavArrow /><span>BACK</span></button>
        <div className={styles.postContainer}>
          <img src={post.thumbnail}
               alt=""/>
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