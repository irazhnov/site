import React, {Component, PropTypes} from 'react';
import PostEditorItem from '../PostEditorItem';
import PostRecentItem from '../PostRecentItem';
import styles from './Intro.css';

export default class Intro extends Component {
  static propTypes = {
    intro: PropTypes.shape({
      editor: PropTypes.shape({}),
      recent: PropTypes.shape({}),
    }),
//     post: PropTypes.shape({
//       id:PropTypes.string.isRequired,
//       thumbnail:PropTypes.string.isRequired,
//       title_plain:PropTypes.string.isRequired,
//       excerpt:PropTypes.string.isRequired,
//       content:PropTypes.string.isRequired,
//     }).isRequired,
  };

  render () {
    return (
      <div>
        <PostEditorItem
          editor={this.props.intro.editor}
          activatePost={()=> {}}/>
        <div className={styles.latestArticleTitle}>LATEST ARTICLES</div>
        <PostRecentItem
          recent={this.props.intro.recent}
          activatePost={()=> {}}/>
      </div>
    );
  }
}