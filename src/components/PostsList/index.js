import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import PostsListItem from '../../components/PostsListItem';
import PostRecentItem from '../../components/PostRecentItem';
import styles from './PostsList.css';


export default class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string.isRequired,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
    }).isRequired),
    typeItems: PropTypes.string.isRequired,
    activatePost: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired,
    numFound: PropTypes.number,
    post: PropTypes.shape({
      id:PropTypes.string,
    thumbnail:PropTypes.string.isRequired,
    title_plain:PropTypes.string.isRequired,
    excerpt:PropTypes.string.isRequired,
    content:PropTypes.string.isRequired,
  }),
  };

  static defaultProps = {
    post: null,
    typeItems: '',
    numFound: null,
  };

  constructor(props) {
    super(props);
    this.handleScroll = ::this.handleScroll;
  }


  handleScroll(e) {
    const listEl = e.target;
    // top shadow
    if (listEl.scrollTop === 0) {
      this.setState({ scrolledClass: false });
    } else {
      this.setState({ scrolledClass: true });
    }

    // lazy load
    if (this.props.posts.length < this.props.numFound &&
      listEl.scrollTop > listEl.scrollHeight -
      (listEl.offsetHeight * 2)) {
      this.props.getCategory();
    }
  }

  render () {
    return (
      <ul className={classnames(this.props.styles ? this.props.styles : styles.postList)}
           onScroll={this.handleScroll}>
        { this.props.posts &&
          this.props.posts.map((item, i) =>
          <div>
            { this.props.typeItems === '' &&
              <PostsListItem
                key={item.id}
                ref={(c) => {
                  this[`postItem${i + 1}`] = c;
                }}
                post={item}
                activatePost={this.props.activatePost}
              />
            }
            { this.props.typeItems === 'Recent' &&
              <PostRecentItem
                key={item.id}
                ref={(c) => {
                  this[`postItem${i + 1}`] = c;
                }}
                post={item}
                activatePost={this.props.activatePost}
              />
            }
          </div>
          )
        }
      </ul>
    )
  }
}