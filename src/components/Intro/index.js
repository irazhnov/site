import React, {Component, PropTypes} from 'react';
import PostEditorItem from '../PostEditorItem';
import PostRecentItem from '../PostRecentItem';
import PostsList from '../PostsList';
import styles from './Intro.css';

export default class Intro extends Component {
  static propTypes = {
    editor: PropTypes.shape({}),
    recent: PropTypes.shape({}),
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
      <div className={styles.editorPageContainer}>
        <PostEditorItem
          editor={this.props.editor}
          activatePost={()=> {}}/>
        <div className={styles.latestArticleTitle}>LATEST ARTICLES</div>
        <PostRecentItem
          recent={this.props.recent}
          activatePost={()=> {}}/>
        {/*<PostsList*/}
          {/*numFound={this.props.category.post_count}*/}
          {/*posts={this.props.app.posts}*/}
          {/*activatePost={this.activatePost}*/}
          {/*getCategory={this.getCategory}/>*/}
        }
      </div>
    );
  }
}