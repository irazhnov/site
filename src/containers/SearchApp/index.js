import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchControl from '../../components/SearchControl';
import PostContent from '../../components/PostContent';
import * as SearchActions from '../SearchApp/actions';

@connect(state => ({
  searchData: state.search,
}))
export default class SearchApp extends Component {
  static propsTypes = {
    searchData: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      selected: PropTypes.shape({
        count: PropTypes.number.isRequired,
        count_total: PropTypes.number.isRequired,
        posts: PropTypes.arrayOf(PropTypes.shape({
          id:PropTypes.string.isRequired,
          thumbnail:PropTypes.string.isRequired,
          title_plain:PropTypes.string.isRequired,
          excerpt:PropTypes.string.isRequired,
          content:PropTypes.string.isRequired,
        }))
      }).isRequired,
    }),
  };
  static defaultProps = {
    searchData: {
      selected: {
        category: {
          post_count: 0,
        },
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      postMode: null,
    };
    this.makeSearch = ::this.makeSearch;
    this.backToMenu = ::this.backToMenu;
    this.goToPost = ::this.goToPost;
    this.returnToList = ::this.returnToList;
    this.makeSearchByPage = ::this.makeSearchByPage;
    this.actions =  bindActionCreators(SearchActions, props.dispatch);
  }

  componentWillMount() {
//     this.actions.makeSearch('diabetes');
  }

  makeSearch(query) {
    if(query !== '') {
      this.actions.makeSearch(query);
    }
  }

  makeSearchByPage(query) {
    if(query !== '') {
      this.actions.makeSearchByPage(query, this.props.searchData.selected.posts.length / this.props.searchData.selected.count + 1);
    }
  }

  backToMenu() {
    this.actions.cleanSearch();
  }

  goToPost(post) {
    this.setState({ postMode : post });
  }

  returnToList() {
    this.setState({ postMode: null});
  }

  render () {
    const { selected, fetching } = this.props.searchData;
    return (
      <div style={{ height: '100%' }}>
        { !this.state.postMode &&
          <SearchControl
            selected={selected}
            fetching={fetching}
            makeSearch={this.makeSearch}
            makeSearchByPage={this.makeSearchByPage}
            backToMenu={this.backToMenu}
            goToPost={this.goToPost}
          />
        }

        { this.state.postMode &&
        <PostContent post={this.state.postMode} returnToList={this.returnToList}/>
        }
      </div>
    )
  }
}