import React, { Component, PropTypes } from 'react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import MainMenu from '../../components/MainMenu';
import PostsList from '../../components/PostsList';
import PostContent from '../../components/PostContent';
import SearchApp from '../../containers/SearchApp';
import '../../../fonts/OpenSansRegular.eot';
import '../../../fonts/OpenSansRegular.woff';
import '../../../fonts/OpenSansRegular.ttf';
import * as AppActions from './actions';
import styles from './App.css';
// import icons from '../../icons';

// import { setAuthState } from '../LoginApp/actions';
// import auth from '../LoginApp/auth';
// import SplashScreen from '../../components/SplashScreen';

@connect(state => ({
  app: state.app,
  searchData: state.search,
}))

export default class App extends Component {
  static propTypes = {
    app: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
    }),
    selected: PropTypes.shape({
      posts: PropTypes.shape({
        id:PropTypes.string.isRequired,
        thumbnail:PropTypes.string.isRequired,
        title_plain:PropTypes.string.isRequired,
        excerpt:PropTypes.string.isRequired,
        content:PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    app: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
      postMode: false
    };
    this.receivedEvent = ::this.receivedEvent;
    this.addBanner = ::this.addBanner;
    this.onDeviceReady = ::this.onDeviceReady;
    this.successCreateBannerView = ::this.successCreateBannerView;
    this.getCategory = ::this.getCategory;
    this.manageMenuVisibility = ::this.manageMenuVisibility;
    this.activatePost = ::this.activatePost;
    this.returnToList = ::this.returnToList;

    this.actions = bindActionCreators(AppActions, props.dispatch);
  }

  componentWillMount() {
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
//     if ( window.plugins && window.plugins.AdMob ) {
//
//       window.plugins.AdMob.requestAd({'isTesting': true}, this.success, this.error); };
//       console.warn('AdMob');
//       var options = {
//         'publisherId': '6499/example/banner',
//         'adSize': window.plugins.AdMob.AD_SIZE.BANNER
//       }
//       window.plugins.AdMob.createBannerView(options, this.successCreateBannerView, this.error);


    let options = {
      'adUnitId': '/6253334/dfp_example_ad/banner',
      'adSize': 'BANNER',
      'tags': {'test': '1'},
      'networkId': 'test.p',
      'backgroundColor': '#FFFFFF'
    };
    DFPPlugin.createBannerAd(options, this.successCreateBannerView, this.error);
  }
  successCreateBannerView() {
    console.warn("addBanner Success");
    DFPPlugin.requestAd({
      'isTesting': false
    }, success, error);
  }

    success() {
    console.warn("requestAd Success");
  };

    error(message) {
      console.log("Oopsie! " + message);
    };

  getCategory(options) {
    if (this.state.isMenuVisible) {
      this.setState({ isMenuVisible: false});
    }
    this.actions.getCategoryList({
      category:options.category,
      subCategory:options.subCategory,
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

  render() {
    return (
      <div>
        {/*<div onClick={this.addBanner}>asdajsdksjsldfsdjl fldsfj dlfjs dfldjf</div>*/}
        <SearchApp />
        <div>
          {this.props.searchData.selected.posts &&
            <div>
              <div onClick={this.manageMenuVisibility}>Menu</div>
              <div className={classnames(styles.menuContainer, {[styles.menuActivated]: !this.state.isMenuVisible} )}>
                <MainMenu
                  getCategory={this.getCategory}/>
              </div>
              <div className={styles.postContainer}>
                {
                  this.props.app.fetching &&
                  <div className={'loadingContainer'}>
                    <div className={'spinner'} />
                  </div>
                }
                { !this.state.isMenuVisible && !this.state.postMode && !this.props.app.fetching && this.props.app.feed && this.props.app.feed.posts &&
                <PostsList posts={this.props.app.feed.posts} activatePost={this.activatePost}/>
                }
                { this.state.postMode &&
                <PostContent post={this.state.postMode} returnToList={this.returnToList}/>
                }
              </div>
              {this.props.children}
            </div>
          }
        </div>
      </div>
    );
  }
}
