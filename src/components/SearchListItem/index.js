import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import styles from './SearchListitem.css';

export default class SearchListInput extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      title_plain: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.createContent = ::this.createContent;
    this.createTitle = ::this.createTitle;
  }

  createTitle() { return {__html: this.props.post.title_plain };};
  createContent() { return {__html: this.props.post.excerpt };};

  render() {
    const { post } = this.props;
    return(
      <div className={styles.itemContainer}>
          <div className={styles.titleContent} dangerouslySetInnerHTML={this.createTitle()} ></div>
          <div  className={styles.contentContainer} dangerouslySetInnerHTML={this.createContent()} ></div>
      </div>
    )
  }
}