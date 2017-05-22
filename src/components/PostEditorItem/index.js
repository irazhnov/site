import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import styles from './PostEditorItem.css';

export default class PostEditorItem extends Component {
  static propTypes = {
    activatePost: PropTypes.func.isRequired,
    mode: PropTypes.string,
    editor: PropTypes.shape({
      category: PropTypes.shape({
        post_count: PropTypes.number.isRequired,
      }),
      pages: PropTypes.number,
      count: PropTypes.number,
      posts: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        thumbnail:PropTypes.string.isRequired,
        title_plain:PropTypes.string.isRequired,
        excerpt:PropTypes.string.isRequired,
        content:PropTypes.string.isRequired,
      }))
    }),
  };

  static defaultProps = {
    mode: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.editor) !== JSON.stringify(nextProps.editor);
  }

  constructor(props) {
    super(props);
    this.createExcerpt = ::this.createExcerpt;
  }

  createExcerpt(post) { return this.props.mode === '' ? {__html: post.excerpt} : {__html: post.content}; };

  render () {
    const post = this.props.editor ? this.props.editor.posts[0] : {};
    return (
      <div className={styles.editorItemContainer}>
        <div className={styles.editorItemContent}>
          <div className={styles.editorHeader}>
            <div className={styles.imageContainer}>
              <img
                className={styles.editorImage}
                src={post.thumbnail}
                alt=""/>
            </div>

            <div className={styles.contentContainer}>
              <div className={'created'}>{moment(post.date).format('MMMM Do, YYYY')}</div>
              <div className={styles.postTitle} >"Letter from Editior"</div>
              <div className={styles.editorText} dangerouslySetInnerHTML={this.createExcerpt(post)} ></div>
            </div>
          </div>
        </div>
        {
          this.props.mode === '' &&
          <button className={styles.readMore} onClick={() => { this.props.activatePost(post) }}
          >READ MORE</button>
        }
      </div>
    )
  }
}