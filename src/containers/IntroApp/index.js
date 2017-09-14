import React, { Component, PropTypes}  from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as IntroActions from './actions';
import * as AppActions from '../App/actions';
import styles from './Intro.css';
import icons from '../../icons';
import Intro from '../../components/Intro';

const PER_PAGE = 10;

const geo = {
  geolocations:[
    {
      id: "123",
      latitude: "53.937875",
      longitude: "28.6827659",
      radius: "50",
    }
  ],
};

@connect (state => ({
  fetching: state.intro.fetching,
  fetchingRecent: state.intro.fetchingRecent,
  editor: state.intro.editor,
  recent: state.intro.recent,
  geo: state.intro.geo,
}))
export default class IntroApp extends  Component {
  static rad(x) {
             return x * Math.PI / 180;
  }
  static propTypes = {
    fetching: PropTypes.bool,
    fetchingRecent: PropTypes.bool,
  };

  static defaultProps = {
    fetching: false,
    fetchingRecent: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      latitude: '',
      longitude: '',
      distance: '',
    };
    this.actions = bindActionCreators(IntroActions, props.dispatch);
    this.goToSearch = ::this.goToSearch;
    this.getRecentPosts = ::this.getRecentPosts;
    this.activatePost = ::this.activatePost;
    this.geolocationSuccess = ::this.geolocationSuccess;
    this.geolocationError = ::this.geolocationError;
    this.onDeviceReady = ::this.onDeviceReady;
    this.calculateDistance = ::this.calculateDistance;
    document.addEventListener("deviceready", this.onDeviceReady, false);
    this.actions.getGeo();
  }

  componentWillMount() {
    if(!this.props.editor) {
      this.actions.getEditorPost();
    }
    if (this.props.recent.posts.length === 0) {
      this.actions.getRecentPosts(1, PER_PAGE);
    }
  }

  componentDidMount() {
    let ad = document.querySelector('#hiper-dic-leadtop9');
    if (ad) {
      ad.setAttribute('style', 'left: 50%; position: absolute; width: 320px; height: 50px; bottom: 0; transform: translateX(-50%); display: block')
    }
    console.log('componentDidMount');

  }

  componentWillUnmount() {
    document.removeEventListener("deviceready", this.onDeviceReady, false);
  }

  onDeviceReady() {
    console.log('device ' + device.platform);

    if (device.platform.indexOf('OS') >= 0) {
      window.navigator.splashscreen.hide();
      StatusBar.hide();
    }
    let ad = document.querySelector('#hiper-dic-leadtop9');
    if (ad) {
      ad.setAttribute('style', 'left: 50%; position: absolute; width: 320px; height: 50px; bottom: 0; transform: translateX(-50%); display: block')
    }
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(this.geolocationSuccess,
        this.geolocationError,
        { timeout: 30000 });
    }

  }

  getRecentPosts() {
   const page = this.props.recent && this.props.recent.posts && this.props.recent.posts.length ? this.props.recent && this.props.recent.posts && this.props.recent.posts.length / PER_PAGE + 1 : 1;
   if (!this.props.fetchingRecent) {
     this.actions.getRecentPosts(page, PER_PAGE);
   }
  }

  geolocationSuccess(position) {
    console.warn();
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    const geo = this.props.geo;
    if (geo.geolocations && geo.geolocations.length > 0) {

      for (let i = 0; i < geo.geolocations.length; i++) {
        if (this.calculateDistance(geo.geolocations[i], position.coords) < Number(geo.geolocations[i].radius)) {
          window.googletag.pubads().setTargeting('geo1', geo.geolocations[i].id);
        } else {
          window.googletag.pubads().setTargeting('geo1', "0");
        }
      }
    }
    window.googletag.pubads().setLocation(position.coords.latitude, position.coords.longitude);
  }
  
  calculateDistance(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = IntroApp.rad(p2.latitude - p1.latitude);
    const dLong = IntroApp.rad(p2.longitude - p1.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(IntroApp.rad(p1.latitude)) * Math.cos(IntroApp.rad(p2.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = Math.round(R * c);
    this.setState({
      distance: d,
    });
    return d; // returns the distance in meter
  }

  geolocationError(error) {
  console.log(error.code);
  if (this.state.latitude === '') {
    this.setState({
      latitude: `Not detected `,
      longitude: 'Not detected',
    });
    window.googletag.pubads().setTargeting('geo1', '0');
    }
  }

  goToSearch() {
    browserHistory.push('/search');
  }

  openMenu() {
    browserHistory.push('/menu');
  }

  activatePost(post) {
    bindActionCreators(AppActions, this.props.dispatch).selectedPost(post);
    browserHistory.push('/post');
  }

  render() {
    return (
      <div className={classnames("mainContainer", {["mainContainerLoading"] : !this.props.editor } )} >
        <div className="searchHeader" onClick={this.goToSearch}>
          <div className={'searchInput'}>
            <span style={{color: '#245428'}}>Diabetes</span>
            <span style={{color: '#cba24e'}}>In</span>
            <span style={{color: '#245428'}}>Control </span>
            <span style={{color: '#afafaf'}}>: Search </span>
            <icons.SearchLens />
          </div>
        </div>
        {this.state.latitude !== '' &&
          <div className={styles.geo}>
            <span>{`latitude: ${this.state.latitude}`}</span>
            <span>{` longitude: ${this.state.longitude}`}</span>
            <span>{` distance: ${this.state.distance}`}</span>
          </div>
        }
        <div className={'menuButton'} onClick={this.openMenu}>
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
        <div className={'selectedHeader'}></div>
        { this.props.editor && this.props.recent &&
          <Intro
            fetchingRecent={this.props.fetchingRecent}
            editor={this.props.editor}
            recent={this.props.recent}
            getRecentPosts={this.getRecentPosts}
            activatePost={this.activatePost}
          />
        }
        {
          this.props.fetching &&
          <div className={classnames('loadingContainer', "backgroundWhite")}>
            <div className={styles.logoContainer}>
              <icons.LogoFull />
            </div>
            <div className={'spinner'} />
          </div>
        }
      </div>
    )
  }
}