import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './SearchControl.css';

export default class SearchControl extends Component {
  static propTypes = {
//     returnToList: PropTypes.func.isRequired,
//     mode: PropTypes.string,
    post: PropTypes.shape({
      id:PropTypes.string.isRequired,
      thumbnail:PropTypes.string.isRequired,
      title_plain:PropTypes.string.isRequired,
      excerpt:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div>
        <div>SEARCH RESULTS</div>

      </div>
    )
  }
}