import React, {Component, PropTypes} from 'react';
import PostEditorItem from '../PostEditorItem';
// import PostRecentItem from '../PostRecentItem';
import PostsList from '../PostsList';
import styles from './Intro.css';

export default class Intro extends Component {
  static propTypes = {
    fetchingRecent: PropTypes.bool,
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
    const recentPosts = this.props.recent.posts.filter((post) => {
      return !post.categories || post.categories.length > 0 && post.categories[0].slug !== 'jobs-from-indeed' &&
        post.categories[0].slug !== 'letter-from-editor' &&
        post.categories[0].slug !== 'test-your-knowledge';
    });

    return (
      <div className={styles.editorPageContainer}>
        <PostEditorItem
          editor={this.props.editor}
          activatePost={this.props.activatePost}/>
        <div className={styles.latestArticleTitle}>LATEST ARTICLES</div>
        {/*<PostRecentItem*/}
          {/*recent={this.props.recent}*/}
          {/*activatePost={()=> {}}/>*/}
        <div className={styles.postListContainer}>
          <PostsList
            styles="introList"
            typeItems="Recent"
            numFound={this.props.recent.pages}
            posts={recentPosts}
            activatePost={this.props.activatePost}
            getCategory={this.props.getRecentPosts}/>
          </div>
        { this.props.fetchingRecent &&
          <div className="loadingContainer">
            <div className={styles.logoContainer}>
            </div>
            <div className="spinner" />
          </div>
        }
      </div>
    );
  }
}