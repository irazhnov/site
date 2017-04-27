import React, { Component, PropTypes } from 'react';

import PostsListItem from '../../components/PostsListItem';
import styles from './RecentList.css';

export default class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string.isRequired,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
    })),
    getCategory: PropTypes.func.isRequired,
    numFound: PropTypes.number.isRequired,
    post: PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string.isRequired,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps ={
    posts: null,
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

    // changing paging numbers
//     for (let i = 1; i <= this.props.adminTags.items.length; i += this.props.postsPerPage) {
//       const postItem = this[`postItem${i}`] ? this[`postItem${i}`] : null;
//
//       if (postItem) {
//         const offsetTop = postItem.offsetTop;
//         //  magic minus calculation height of container
//         if (listEl.scrollTop > offsetTop) {
//           this.setState({
//             currentPage: i === 1 ? 1 : Math.floor(i / this.props.postsPerPage) + 1,
//           });
//         }
//       }
//     }
  }

  render () {
    const { posts } = this.props;
    return (
      <ul className={styles.postList}
          onScroll={this.handleScroll}>
        { this.props.posts &&
          this.props.posts.map((item, i) =>
            <PostsListItem
              key={item.id}
              ref={(c) => { this[`postItem${i + 1}`] = c; }}
              post={item}
              activatePost={this.props.activatePost}
            />
          )
        }
      </ul>
    )
  }
}