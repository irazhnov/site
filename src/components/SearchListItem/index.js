import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import styles from './SearchListitem.css';
import icons from '../../icons';

export default class SearchListItem extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      title_plain: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.createContent = ::this.createContent;
    this.createTitle = ::this.createTitle;
  }

  createTitle() { return {__html: this.props.post.title_plain };};
  createContent() { return {__html: this.props.post.excerpt };};

  render() {
    return(
      <div
        className={styles.itemContainer}
        onClick={() => {this.props.goToPost(this.props.post) }}
      >
        <div className={styles.iconBack}>
          <icons.NavArrow />
        </div>
          <div className={styles.titleContent} dangerouslySetInnerHTML={this.createTitle()} ></div>
          <div  className={styles.contentContainer} dangerouslySetInnerHTML={this.createContent()} ></div>
      </div>
    )
  }
}