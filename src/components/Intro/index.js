import React, {Component, PropTypes} from 'react';
import PostEditorItem from '../PostEditorItem';
import PostRecentItem from '../PostRecentItem';
import PostsList from '../PostsList';
import styles from './Intro.css';

export default class Intro extends Component {
  static propTypes = {
    editor: PropTypes.shape({}),
    recent: PropTypes.shape({}),
    activatePost: PropTypes.func.isRequired,
    getRecentPosts: PropTypes.func.isRequired,
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
          activatePost={this.props.activatePost}/>
        <div className={styles.latestArticleTitle}>LATEST ARTICLES</div>
        {/*<PostRecentItem*/}
          {/*recent={this.props.recent}*/}
          {/*activatePost={()=> {}}/>*/}
        <PostsList
          styles={'introList'}
          numFound={this.props.recent.pages}
          posts={this.props.recent.posts}
          activatePost={this.props.activatePost}
          getCategory={this.props.getRecentPosts}/>
        }
      </div>
    );
  }
}