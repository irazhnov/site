import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import icons from '../../icons';

// import { setAuthState } from '../LoginApp/actions';
// import auth from '../LoginApp/auth';
//import * as MediaSearchActions from '../MediaSearchApp/actions';
import * as AppActions from './actions';
//import * as WriterAppActions from '../WriterApp/actions';
//import * as AdminTagsAppActions from '../AdminTagsApp/actions';
import styles from './App.css';
import SplashScreen from '../../components/SplashScreen';
import MainMenu from '../../components/MainMenu';

@connect(state => ({
 app: state.app,
}))

export default class App extends Component {
  static propTypes = {
    app: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
    }),
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    app: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
    };
    this.receivedEvent = ::this.receivedEvent;
    this.addBanner = ::this.addBanner;
    this.onDeviceReady = ::this.onDeviceReady;
    this.successCreateBannerView = ::this.successCreateBannerView;
    this.getCategory = ::this.getCategory;
    this.manageMenuVisibility = ::this.manageMenuVisibility;

    this.actions = bindActionCreators(AppActions, props.dispatch);
  }

  componentWillMount() {
//     this.actions.getGlucoseControl();
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
    this.actions.getGlucoseControl();
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

  render() {
    return (
      <div>
        {/*<div onClick={this.addBanner}>asdajsdksjsldfsdjl fldsfj dlfjs dfldjf</div>*/}
        <div onClick={this.manageMenuVisibility}>Menu</div>
        <div className={classnames({[styles.menuActivated]: !this.state.isMenuVisible} )}>
          <MainMenu
            getCategory={this.getCategory}/>
        </div>
        <div>
          {
            this.props.app.fetching &&
            <div className={styles.spinner}/>
          }
          
        </div>
        {this.props.children}
      </div>
    );
  }
}
