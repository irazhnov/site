import React, { Component, PropTypes}  from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as IntroActions from './actions';
import styles from './Intro.css';
import icons from '../../icons';
import Intro from '../../components/Intro';

const PER_PAGE = 10;

@connect(state => ({
  fetching: state.intro.fetching,
  editor: state.intro.editor,
  recent: state.intro.recent,
}))
export default class IntroApp extends  Component {
  static propTypes = {
    fetching: PropTypes.bool,
  };

  static defaultProps = {
    fetching: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
    };
    this.actions = bindActionCreators(IntroActions, props.dispatch);
    this.goToSearch = ::this.goToSearch;
    this.getRecentPosts = ::this.getRecentPosts;
  }

  componentWillMount() {
    if(!this.props.editor) {
      this.actions.getEditorPost();
    }
    if (!this.props.recent) {
      this.actions.getRecentPosts(1, PER_PAGE);
    }
  }

  getRecentPosts() {
   const page = this.props.recent && this.props.recent.posts && this.props.recent.posts.length ? this.props.recent && this.props.recent.posts && this.props.recent.posts.length / PER_PAGE + 1 : 1;
    this.actions.getRecentPosts(page, PER_PAGE);
  }

  goToSearch() {
    browserHistory.push('/search');
  }

  openMenu() {
    browserHistory.push('/categories');
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <div className={'searchHeader'} onClick={this.goToSearch}>
          <div className={'searchInput'}>
            <span style={{color: '#245428'}}>Diabetes</span>
            <span style={{color: '#cba24e'}}>In</span>
            <span style={{color: '#245428'}}>Control </span>
            <span style={{color: '#afafaf'}}>: Search </span>
            <icons.SearchLens />
          </div>
        </div>
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
            editor={this.props.editor}
            recent={this.props.recent}
            getRecentPosts={this.getRecentPosts}
          />
        }
        {
          this.props.fetching &&
          <div className={'loadingContainer'}>
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