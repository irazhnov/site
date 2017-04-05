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
      selected: PropTypes.shape({}).isRequired,
    }),
  };
  static defaultProps = {
    searchData: {}
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
      <div>
        { !this.state.postMode &&
          <SearchControl
            selected={selected}
            fetching={fetching}
            makeSearch={this.makeSearch}
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