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
      count_total: PropTypes.number,
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
      count_total: 0,
      posts: [],
    },
  };
  constructor(props) {
    super(props);
    this.createContent = ::this.createContent;
    this.createTitle = ::this.createTitle;
    this.onChange = ::this.onChange;
    this.handleScroll = ::this.handleScroll;
  }

  createTitle() { return {__html: this.props.post.title_plain };};
  createContent() { return {__html: this.props.post.content };};

  onChange(e) {
    if(e.target.value !== '') {
      this.query = e.target.value;
      this.props.makeSearch(e.target.value);
    }
  }

  handleScroll(e) {
    const listEl = e.target;
    // top shadow
    if (listEl.scrollTop === 0) {
      this.setState({scrolledClass: false});
    } else {
      this.setState({scrolledClass: true});
    }

    // lazy load
    if (this.props.selected.posts.length < this.props.selected.count_total &&
      listEl.scrollTop > listEl.scrollHeight -
      (listEl.offsetHeight * 2)) {
      this.props.makeSearch(this.query);
    }
  }

  render () {
    const { posts } = this.props.selected;
    return (
      <div style={{ height: '100%' }}>
        <div
          className={styles.backButton}
        >
          <div
            onClick={(e) => {e.stopPropagation(); this.input.value = ''; this.props.backToMenu()}}
          >
            <icons.NavArrow />
          </div>
        <input
          ref={(c) =>{ this.input = c; }}
          className={styles.searchInput} placeholder="Search"
          onChange={this.onChange}/>
          <div className={styles.searchLensLogo}>
            <icons.SearchLens />
          </div>

        </div>
        {
          this.props.fetching && this.query !== '' &&
          <div className={'loadingContainer'}>
            <div className={'spinner'} />
          </div>
        }
        { posts &&
        <ul className={styles.searchListContainer} onScroll={this.handleScroll}>
          {
          posts.map((item) =>
          <SearchListItem
            key={item.id}
            post={item}
            goToPost={this.props.goToPost}
          />
          )}
      </ul>
      }
      </div>
    )
  }
}
