import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import MainMenu from '../../components/MainMenu';
import PostsList from '../../components/PostsList';
import PostContent from '../../components/PostContent';
import Intro from '../../components/Intro';
import Ad from '../../components/Ad';
import * as AppActions from './actions';
import styles from './App.css';
import icons from '../../icons';

const PER_PAGE = 10;

@connect(state => ({
  app: state.app,
  intro: state.app.intro,
}))

export default class App extends Component {
  static propTypes = {
    intro:  PropTypes.shape({
      editor: PropTypes.shape({}),
      recent: PropTypes.shape({}),
    }),
    app: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      feed: PropTypes.shape({
        category: PropTypes.shape({
          post_count: PropTypes.number.isRequired,
        }),
        pages: PropTypes.number,
        count: PropTypes.number,
        posts: PropTypes.arrayOf(PropTypes.shape({
          id:PropTypes.string.isRequired,
          thumbnail:PropTypes.string.isRequired,
          title_plain:PropTypes.string.isRequired,
          excerpt:PropTypes.string.isRequired,
          content:PropTypes.string.isRequired,
        }))
      }),
    }),
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    app: {
      pages: 0,
      posts: [],
      count: 0,
    },
    intro: {
      editor: {},
      recent: {},
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
      postMode: false,
    };
    this.receivedEvent = ::this.receivedEvent;
    this.addBanner = ::this.addBanner;
    this.onDeviceReady = ::this.onDeviceReady;
    this.getCategory = ::this.getCategory;
    this.manageMenuVisibility = ::this.manageMenuVisibility;
    this.activatePost = ::this.activatePost;
    this.returnToList = ::this.returnToList;
    this.goToSearch = ::this.goToSearch;

    this.currentCategory = '';
    this.actions = bindActionCreators(AppActions, props.dispatch);
  }

  componentWillMount() {
//     this.actions.getIntroData();

    document.addEventListener('deviceready', this.onDeviceReady, false);
  }

  onDeviceReady() {
    this.receivedEvent('deviceready');
  }

  receivedEvent (id) {
//     this.addBanner();
    console.log('Received Event: ' + id);
  }

  addBanner() {
    return;
    console.warn('window.plugins.AdMob' + window.AdMob);
  }

  getCategory(category) {
    if (category) {
      this.currentCategory = category;
      this.actions.cleanCategory();
    }
    if (this.state.isMenuVisible) {
      this.setState({ isMenuVisible: false});
    }
    const pageNumber = this.props.app.posts.length > 0 ? this.props.app.posts.length / PER_PAGE + 1 : 1;
    this.actions.getCategoryList({
      category: this.currentCategory,
      page: pageNumber,
      per_page: PER_PAGE,
    })
  }

  manageMenuVisibility() {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }
  
  activatePost(post) {
    this.setState({ postMode: post});
  }

  returnToList() {
    this.setState({ postMode: null});
  }

  goToSearch() {
    browserHistory.push('/search');
  }

  render() {
    const title = this.props.app && this.props.app.category ? this.props.app.category.title : '';
    return (
      <div style={{ height: '100%' }}>
        <div className={'searchHeader'} onClick={this.goToSearch}>
          <div className={'searchInput'}>
            <span style={{color:'#245428'}}>Diabetes</span>
            <span style={{color:'#cba24e'}}>In</span>
            <span style={{color:'#245428'}}>Control </span>
            <span style={{color:'#afafaf'}}>: Search </span>
            <icons.SearchLens />
          </div>
        </div>
        {/*<Ad />*/}
        <div className={'menuButton'} onClick={this.manageMenuVisibility}>
          <div className={'menuIcon'}>
            <div className={'menuLine'}></div>
            <div className={'menuLine'}></div>
            <div className={'menuLine'}></div>
          </div>
          <span className={'menuTitle'}>MENU</span>
          <div className={'logo'}>
            <icons.Logo />
          </div>
        </div>

        <div className={'selectedHeader'}>
          { !this.state.isMenuVisible && title &&
            <div
              className={styles.categoryTitle}
              onClick={(e) => {e.stopPropagation(); this.actions.cleanCategory()}}
            >
              <div className={styles.backToIntro}>
                <icons.NavArrow />
              </div>
              <span>{title}</span>
            </div>
          }
        </div>
        {/*{ this.props.intro && !this.props.app.posts.length > 0 &&*/}
        {/*<Intro intro={this.props.intro} />*/}
        {/*}*/}
        <div className={classnames(styles.menuContainer, {[styles.menuActivated]: !this.state.isMenuVisible} )}>
          <MainMenu
            getCategory={this.getCategory}/>
        </div>
        <div className={styles.postContainer}>
          { !this.state.isMenuVisible && !this.state.postMode && this.props.app && this.props.app.posts.length > 0 && this.props.app.category &&
          <PostsList
            numFound={this.props.app.category.post_count}
            posts={this.props.app.posts}
            activatePost={this.activatePost}
            getCategory={this.getCategory}/>
          }
          {
            this.props.app.fetching &&
            <div className={'loadingContainer'}>
              <div className={'spinner'} />
            </div>
          }
          { this.state.postMode &&
          <PostContent post={this.state.postMode} returnToList={this.returnToList}/>
          }
        </div>
        {this.props.children}
      </div>
    );
  }
}
