import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './SearchControl.css';
import SearchListItem from '../SearchListItem';
import icons from '../../icons';

export default class SearchControl extends Component {
  static propTypes = {
    goToPost: PropTypes.func.isRequired,
    cleanSearch: PropTypes.func.isRequired,
    backToMenu: PropTypes.func.isRequired,
    makeSearch: PropTypes.func.isRequired,
//     fetching: PropTypes.bool.isRequired,
    selected: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
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
      count_total: null,
      posts: [],
    },
  };

  constructor(props) {
    super(props);
    this.createContent = ::this.createContent;
    this.createTitle = ::this.createTitle;
    this.handleScroll = ::this.handleScroll;
    this.onKeyDown = ::this.onKeyDown;
    this.makeSearch = ::this.makeSearch;

    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  createTitle() { return {__html: this.props.post.title_plain };};
  createContent() { return {__html: this.props.post.content };};

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.makeSearch();
    }
  }

  makeSearch() {
    if (this.input.value !== '') {
      this.query = this.input.value;
      if (this.props.selected.count_total === 0) {
        this.props.cleanSearch();
      }

      this.props.makeSearch(this.input.value);
      if (Keyboard && Keyboard.hide) {
        Keyboard.hide();
      }
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
      (listEl.offsetHeight * 2) && !this.props.selected.fetching) {
      this.makeSearch(this.query);
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
            onClick={(e) => {e.stopPropagation(); this.props.backToMenu()}}
          >
            <icons.NavArrow />
          </div>
        <input
          ref={(c) =>{ this.input = c; }}
          className={styles.searchInput} placeholder="Search"
          onChange={this.onChange}/>
          <div className={styles.searchLensLogo} onClick={this.makeSearch}>
            <icons.SearchLens />
          </div>
        </div>
        {
          this.props.fetching && this.query !== '' &&
          <div className={'loadingContainer'}>
            <div className={'spinner'} />
          </div>
        }
        { posts && posts.length > 0 &&
        <div className={styles.listContainer}>
          <div className={styles.resultTitle}>SEARCH RESULTS</div>
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
        </div>
      }
      {this.props.selected.count_total === 0 &&
      <div className={'loadingContainer'}>
        <span className={styles.noResults}>No Results</span>
      </div>
      }
      </div>
    )
  }
}
