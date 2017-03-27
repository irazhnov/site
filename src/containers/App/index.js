import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { injectIntl } from 'react-intl';
//import NotificationSystem from 'react-notification-system';


import { setAuthState } from '../LoginApp/actions';
import auth from '../LoginApp/auth';
//import LeftToolbar from '../../components/LeftToolbar';
//import * as ContextMenuActions from '../ContextMenu/actions';
//import * as MediaSearchActions from '../MediaSearchApp/actions';
import * as AppActions from './actions';
//import PopUp from '../../components/PopUp';
//import SettingsForm from '../../components/SettingsForm';
//
//import * as WriterAppActions from '../WriterApp/actions';
//import * as AdminTagsAppActions from '../AdminTagsApp/actions';
import styles from './App.css';

const defaultNotificationOpts = {
  autoDismiss: 3,
};

// const notificationStyles = {
//   Containers: {
//     DefaultStyle: {
//       width: 'auto',
//       padding: '11px 8px 11px 15px',
//     },
//   },
//   NotificationItem: {
//     DefaultStyle: { // Applied to every notification, regardless of the notification level
//       borderRadius: 4,
//       borderTop: 'none',
//       margin: 0,
//       boxShadow: 'none',
//     },
//
//     success: { // Applied only to the success notification item
//       color: '#ffffff',
//       background: '#3db790',
//     },
//   },
//   Dismiss: {
//     DefaultStyle: {
//       background: '#ffffff',
//       color: '#3db790',
//     },
//   },
// };


@connect(state => ({
//  isContextMenuOpened: state.contextMenu.isContextMenuOpened,
//  isSaveOpened: state.article.isSaveOpened,
//  isPopupOpened: state.settings.isPopupOpened,
//  imageMetaData: state.mediaSearch.imageMetaData,
//  notification: state.settings.notification,
//  user: state.settings.user,
//  channels: state.settings.channels,
//  preferredChannels: state.settings.preferredChannels,
//  settings: state.settings,
//  defaultPlus: state.settings.defaultPlus,
}))

export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

//   static defaultProps = {
//   };

  constructor(props) {
    super(props);
    this.receivedEvent = ::this.receivedEvent;
    this.addBanner = ::this.addBanner;
    this.onDeviceReady = ::this.onDeviceReady;

    this.actions = bindActionCreators(AppActions, props.dispatch);
  }

  componentWillMount() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    this.actions.getPosts();
  }

  onDeviceReady() {
    debugger;
    this.receivedEvent('deviceready');
  }

  receivedEvent (id) {
//     this.addBanner();
    console.log('Received Event: ' + id);
  }

  addBanner() {
    console.warn('window.plugins.AdMob' +  window.plugins.AdMob);
    if ( window.plugins && window.plugins.AdMob ) {

      window.plugins.AdMob.requestAd({'isTesting': true}, this.success, this.error); };
      console.warn('AdMob');
      var options = {
        'publisherId': 'ca-app-pub-4789158063632032/7680949608',
        'adSize': window.plugins.AdMob.AD_SIZE.BANNER
      }
      window.plugins.AdMob.createBannerView(options, this.successCreateBannerView, this.error);
    }

  successCreateBannerView() {
    console.warn("addBanner Success");
  }

    success() {
    console.warn("requestAd Success");
  };

    error(message) {
      console.log("Oopsie! " + message);
    };

  render() {
    return (
      <div onClick={this.addBanner}
      >Hi !!!
        <div  className={styles.mainContainer}>asdajsdksjsldfsdjl fldsfj dlfjs dfldjf</div>
        {this.props.children}
      </div>
    );
  }
}
