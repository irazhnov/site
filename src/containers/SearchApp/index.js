import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import SearchControl from '../../components/SearchControl';
import PostContent from '../../components/PostContent';
import * as SearchActions from '../SearchApp/actions';
import * as AppActions from '../App/actions';


const PER_PAGE = 10;

@connect(state => ({
  searchData: state.search,
}))
export default class SearchApp extends Component {
  static propTypes = {
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
    this.cleanSearch = ::this.cleanSearch;
    this.makeSearch = ::this.makeSearch;
    this.backToMenu = ::this.backToMenu;
    this.goToPost = ::this.goToPost;
    this.returnToList = ::this.returnToList;
    this.actions =  bindActionCreators(SearchActions, props.dispatch);
  }

  componentDidMount() {
    let ad = document.querySelector('#hiper-dic-leadtop9');
    if (ad) {
      ad.setAttribute('style', 'top: 54px; left: 50%; position: absolute; width: 320px; height: 50px; transform: translateX(-50%); display: block')
    }
  }

//   componentDidUpdate() {
//     let ad = document.querySelector('#hiper-dic-leadtop9');
//     if (ad && this.state.postMode) {
//       ad.setAttribute('style', 'display: none');
//     }
//     if (ad && !this.state.postMode) {
//       ad.setAttribute('style', 'top: 54px; left: 50%; position: absolute; width: 320px; height: 50px; transform: translateX(-50%); display: block')
//     }
//   }

  makeSearch(query) {
    if(query !== '') {
      const page = this.props.searchData.posts.length > 0 ? Math.round(this.props.searchData.posts.length / PER_PAGE) + 1 : 1;
      this.actions.makeSearch(query, page, PER_PAGE);
    }
  }


  backToMenu() {
    browserHistory.goBack();
  }

  cleanSearch() {
    this.actions.cleanSearch();
  }

  goToPost(post) {
    bindActionCreators(AppActions, this.props.dispatch).selectedPost(post);
    browserHistory.push('/post');
  }

  returnToList() {
    this.setState({ postMode: null});
  }

  render () {
    const { fetching } = this.props.searchData;
    return (
      <div style={{ height: '100%', backgroundColor: '#fff' }}>
        { !this.state.postMode &&
          <SearchControl
            selected={this.props.searchData}
            fetching={fetching}
            makeSearch={this.makeSearch}
            cleanSearch={this.cleanSearch}
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