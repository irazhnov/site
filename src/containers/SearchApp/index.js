import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchControl from '../../components/SearchControl';
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
    this.makeSearch = ::this.makeSearch;
   this.actions =  bindActionCreators(SearchActions, props.dispatch);
  }

  componentWillMount() {
    this.actions.makeSearch('diabetes');
  }

  makeSearch(query) {
    if(query !== '') {
      this.actions.makeSearch(query);
    }
  }

  render () {
    const { selected, fetching } = this.props.searchData;
    return (
      <div>
        <SearchControl selected={selected} fetching={fetching} makeSearch={this.makeSearch}/>
      </div>
    )
  }
}