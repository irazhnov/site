import React, { Component, PropTypes } from 'react';
import styles from './MainMenuItem.css';
import SubMenuItem from '../SubMenuItem';
import icons from '../../icons';

export default class ManinMenuItem extends Component {
static propTypes = {
  swipeVisibility: PropTypes.func.isRequired,
  getSubCategoryData:  PropTypes.func.isRequired,
  onMenuClicked:  PropTypes.func.isRequired,
  menuData: PropTypes.shape({
    label: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

  constructor(props) {
    super(props);
    this.state = {isSubMenuVisible: false};
    this.deselectMenu = :: this.deselectMenu;
    this.selectMenu = :: this.selectMenu;
    this.onScroll = :: this.onScroll;
//     this.onMouseDown = :: this.onMouseDown;
//     this.onMouseUp = :: this.onMouseUp;
//     this.cleanTimeout = :: this.cleanTimeout;
//     this.longTapTimeout;
  }

  selectMenu() {
    this.setState({isSubMenuVisible: true });
  }

  deselectMenu() {
    this.setState({isSubMenuVisible: false });
  }

//   onMouseDown() {
//     this.cleanTimeout();
//     this.longTapTimeout = setTimeout(() => {
// //       this.props.getSubCategoryData(this.props.menuData.slug)
//     }, 1000);
//   }
//
//   onMouseUp() {
//     this.cleanTimeout();
//       this.props.onMenuClicked(this.props.menuData);
//   }

//   cleanTimeout() {
//     if(this.longTapTimeout){
//       clearTimeout(this.longTapTimeout);
//       this.longTapTimeout = null;
//     }
//   }

  onScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.swipeVisibility(e.target.scrollTop === 0);
  }

  render () {
    const { label} = this.props.menuData;
    return (
      <div>
        <div
          className={styles.itemContainer}
          onClick={() => {this.props.onMenuClicked(this.props.menuData);}}
        >{label}
          <div className={styles.menuArrow}>
            <icons.MenuArrow />
          </div>
        </div>
        <div className={styles.subMenuContainer} onScroll={this.onScroll}>
        {
          this.state.isSubMenuVisible &&
          this.props.menuData.submenu.map((item) =>
            <div>
              <SubMenuItem
                key={item.slug}
                data={item}
                getSubCategoryData={this.props.getSubCategoryData}
              />
            </div>
            )
        }
        </div>
      </div>
    )
  }
}
