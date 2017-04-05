import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './SearchControl.css';
import SearchListItem from '../SearchListItem';
import icons from '../../icons';

export default class SearchControl extends Component {
  static propTypes = {
    goToPost: PropTypes.func.isRequired,
    backToMenu: PropTypes.func.isRequired,
    makeSearch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    selected: PropTypes.shape({
      posts:  PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        thumbnail:PropTypes.string.isRequired,
        title_plain:PropTypes.string.isRequired,
        excerpt:PropTypes.string.isRequired,
        content:PropTypes.string.isRequired,
      }),)
    }),
  };

  static defaultProps = {
    selected: {
      posts: [],
    },
  };
  constructor(props) {
    super(props);
    this.createContent = ::this.createContent;
    this.createTitle = ::this.createTitle;
    this.onChange = ::this.onChange;
  }

  createTitle() { return {__html: this.props.post.title_plain };};
  createContent() { return {__html: this.props.post.content };};

  onChange(e) {
    if(e.target.value !== '') {
      this.query = e.target.value;
      this.props.makeSearch(e.target.value);
    }
  }


  render () {
    const { posts } = this.props.selected;
    return (
      <div>
        <div
          className={styles.backButton}
        >
          <div
            className={classnames(styles.backIcon, {[styles.backIconActive]: posts && posts.length > 0 })}
            onClick={(e) => {e.stopPropagation(); this.input.value = ''; this.props.backToMenu()}}
          >
            <icons.NavArrow />
          </div>

        <input
          ref={(c) =>{ this.input = c; }}
          className={styles.searchInput} placeholder="Search"
          onChange={this.onChange}/>
        </div>
        <div className={styles.searchListContainer}>
          {
            this.props.fetching && this.query !== '' &&
            <div className={'loadingContainer'}>
              <div className={'spinner'} />
            </div>
          }
          { posts &&
            posts.map((item) =>
            <SearchListItem
              key={item.id}
              post={item}
              goToPost={this.props.goToPost}
            />
          )
        }
        </div>
      </div>
    )
  }
}
