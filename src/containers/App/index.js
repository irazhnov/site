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

const notificationStyles = {
  Containers: {
    DefaultStyle: {
      width: 'auto',
      padding: '11px 8px 11px 15px',
    },
  },
  NotificationItem: {
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      borderRadius: 4,
      borderTop: 'none',
      margin: 0,
      boxShadow: 'none',
    },

    success: { // Applied only to the success notification item
      color: '#ffffff',
      background: '#3db790',
    },
  },
  Dismiss: {
    DefaultStyle: {
      background: '#ffffff',
      color: '#3db790',
    },
  },
};


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
    isContextMenuOpened: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    router: PropTypes.shape({
      isActive: PropTypes.func.isRequired,
    }).isRequired,
    isPopupOpened: PropTypes.bool.isRequired,
    imageMetaData: PropTypes.shape({
      imageId: PropTypes.string,
    }),
    isEditListMode: PropTypes.bool.isRequired,
    notification: PropTypes.shape(Object),
    isSaveOpened: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string,
    }).isRequired,
    settings: PropTypes.shape(Object).isRequired,
    preferredChannels: PropTypes.arrayOf(Object).isRequired,
    channels: PropTypes.arrayOf(Object).isRequired,
    defaultPlus: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    imageMetaData: {
      imageId: '',
    },
    isEditListMode: false,
    notification: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSettingsOpened: false,
      channels: props.channels,
    };
    this.handleContainerClick = ::this.handleContainerClick;
    this.closeSettings = ::this.closeSettings;
    this.openSettings = ::this.openSettings;
    this.filterChannels = ::this.filterChannels;
    this.resetChannels = ::this.resetChannels;
    this.saveSettings = ::this.saveSettings;
    this.logout = ::this.logout;

    this.actions = bindActionCreators(AppActions, props.dispatch);

  }

  componentWillMount() {
    this.actions.getUserSettings();
    this.actions.getCurrentUser();
    this.actions.getChannels();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.channels.length && nextProps.channels.length) {
      this.setState({
        channels: nextProps.channels,
      });
    }
    if (JSON.stringify(this.props.notification) !== JSON.stringify(nextProps.notification)) {
      this.notificationSystem.addNotification({
        ...defaultNotificationOpts,
        ...nextProps.notification,
      });
    }
  }

  handleContainerClick() {
    const { dispatch } = this.props;
    if (this.props.isContextMenuOpened) {
      const actions = bindActionCreators(ContextMenuActions, dispatch);
      actions.blockUnSelected();
    }
    if (this.props.isSaveOpened) {
      this.props.dispatch(WriterAppActions.setSaveMenuVisibility(false));
    }
    if (this.props.isEditListMode) {
      this.props.dispatch(AdminTagsAppActions.closeEditListMode());
    }

    if (this.props.imageMetaData.imageId) {
      const actionsMediaSearch = bindActionCreators(MediaSearchActions, dispatch);
      setTimeout(() => {
        actionsMediaSearch.closeMediaSearchInfo();
      }, 0);
    }
    // make to close SideBar
    document.dispatchEvent(new Event('sidebarClose'));
  }

  openSettings() {
    this.setState({
      isSettingsOpened: true,
    });
  }

  closeSettings(wasSaved) {
    this.setState({
      isSettingsOpened: false,
    });
    if (!wasSaved || typeof wasSaved === 'object') {
      this.actions.getUserSettings();
    }
  }

  filterChannels(value) {
    this.setState({
      channels: this.props.channels.filter(item => item.name.indexOf(value) !== -1),
    });
  }

  resetChannels() {
    this.setState({
      channels: this.props.channels,
    });
  }

  saveSettings() {
    this.actions.updateUserSettings(this.props.settings);
    this.closeSettings(true);
  }

  logout() {
    this.props.dispatch(setAuthState(false));
    auth.logout();
    browserHistory.push('/login');
  }

  render() {
    return (
      <div
        style={{ height: '100%' }}
        onClick={this.handleContainerClick}
        onDrop={(e) => { e.preventDefault(); }}
      >
        {this.props.children}
      </div>
    );
  }
}
