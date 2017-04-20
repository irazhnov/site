import React, { Component, PropTypes}  from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as IntroActions from './actions';
import styles from './Intro.css';
import icons from '../../icons';
import Intro from '../../components/Intro';

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
  }

  componentWillMount() {
    this.actions.getEditorPost();
    this.actions.getRecentPosts();
  }

  goToSearch() {
    browserHistory.push('/search');
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
        <div className={'menuButton'} >
          <div className={'menuIcon'}>
            <div className={'menuLine'}></div>
            <div className={'menuLine'}></div>
            <div className={'menuLine'}></div>
          </div>
          <span className={styles.menuTitle}>MENU</span>
          <div className={styles.logo}>
            <icons.Logo />
          </div>
        </div>
        <div className={'selectedHeader'}></div>
        { this.props.editor && this.props.recent &&
          <Intro editor={this.props.editor} recent={this.props.recent} />
        }
        {
          this.props.fetching &&
          <div className={'loadingContainer'}>
            <div className={'spinner'} />
          </div>
        }
      </div>
    )
  }
}