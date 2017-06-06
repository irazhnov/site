import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as AppActions from '../App/actions';
import  styles from './MenuApp.css'
import  MainMenu from '../../components/MainMenu';
import icons from '../../icons';

const PER_PAGE = 10;

@connect((state) => ({
  post: state.app.selectedPost,
  app: state.app,
}))
export default class MenuApp extends Component {
  static propTypes = {
    post: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    this.state = {
      isSwipeVisible: false,
    };
    this.returnToList = :: this.returnToList;
    this.getCategory = :: this.getCategory;
    this.swipeVisibility = :: this.swipeVisibility;
    this.onClick = :: this.onClick;
    this.actions = bindActionCreators(AppActions, props.dispatch);
  }

  componentDidMount() {
    let ad = document.querySelector('#hiper-dic-leadtop9');
    if (ad) {
      ad.setAttribute('style', 'position: static; width: 320px; height: 50px; display: none');
    }
  }

  returnToList() {
    this.actions.selectedPost(null);
    browserHistory.goBack();
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
    if (!this.props.app.fetching) {
      this.actions.getCategoryList({
        category: this.currentCategory,
        page: pageNumber,
        per_page: PER_PAGE,
      });
      browserHistory.push('/categories');
    }
  }

  swipeVisibility(value) {
//     this.setState({
//       isSwipeVisible : value,
//     });
  }

  onClick() {
    if (this.props.app.posts.length > 0) {
      browserHistory.push('/categories');
    } else {
      browserHistory.push('/intro');
    }
  }

  render() {
    return (
      <div style={{ height: '100%' }} >
        <div className={styles.menuHeader} onClick={this.onClick}>
            <div>
              <icons.NavArrow />
              <span className={styles.menuTitle}>Latest Articles</span>
            </div>
          <span className={styles.mainMenuTitle}>MAIN MENU</span>
        </div>
        <div className={styles.menuContainer}>
            <MainMenu
              getCategory={this.getCategory}
              swipeVisibility={this.swipeVisibility}
            />
        </div>
      </div>
    )
  }
}