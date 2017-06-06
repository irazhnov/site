import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../App/actions';
import  PostContent from '../../components/PostContent';

@connect((state) => ({
  post: state.app.selectedPost
}))
export default class PostApp extends Component {
  static propTypes = {
    post: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    this.returnToList = :: this.returnToList;
    this.actions = bindActionCreators(AppActions, props.dispatch);
  }

  componentDidMount() {
    let ad = document.querySelector('#hiper-dic-leadtop9');
    if (ad) {
      ad.setAttribute('style', 'position: static; width: 320px; height: 50px; display: none')
    }
  }

  returnToList() {
    this.actions.selectedPost(null);
    browserHistory.goBack();
  }

  render() {
    return (
    <div style={{ height: '100%' }}>
      <PostContent returnToList={this.returnToList} post={this.props.post}/>
    </div>
    )
  }
}