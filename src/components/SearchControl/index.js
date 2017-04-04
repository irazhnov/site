import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './SearchControl.css';
import SearchListItem from '../SearchListItem';
import icons from '../../icons';

export default class SearchControl extends Component {
  static propTypes = {
    makeSearch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    selected: PropTypes.shape({
      posts: PropTypes.shape({
        id:PropTypes.string.isRequired,
        thumbnail:PropTypes.string.isRequired,
        title_plain:PropTypes.string.isRequired,
        excerpt:PropTypes.string.isRequired,
        content:PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
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
        <div className={styles.backButton}
        ><icons.NavArrow />
        <input className={styles.searchInput} placeholder="Search"
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
              <SearchListItem key={item.id}
                              post={item}/>
            )
          }
        </div>
      </div>
    )
  }
}
