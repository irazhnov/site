import React, { Component, PropTypes } from 'react';
import styles from './SubMenuItem.css';

export default class SubMenuItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }),
  };

  render () {
    const { label, slug} = this.props.data;
    return (
      <div
        className={styles.subMenuItemContainer}
        onClick={()=> {this.props.getSubCategoryData(slug);}}
      >{label}
      </div>
    )
  }
}