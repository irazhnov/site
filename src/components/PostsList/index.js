import React, { Component, PropTypes } from 'react';

import PostsListItem from '../../components/PostsListItem';

export default class PostsList extends Component {

  render () {
    const { posts } = this.props;
    return (
      <div>
        {
          this.props.posts.map((item) =>
            <PostsListItem
              key={item.id}
              post={item}
            />
          )
        }
      </div>
    )
  }
}