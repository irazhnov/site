import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import menuMock from '../../Utils/menuMock';
import MainMenuItem from '../MainMenuItem';

export default class ManinMenu extends Component {

  constructor(props) {
    super(props);
    this.categorySelected = '';
    this.onMenuClicked = :: this.onMenuClicked;
    this.getSubCategoryData = :: this.getSubCategoryData;
  }

  onMenuClicked(item) {
    for(let i=0; i< menuMock.length;i++){
      this[menuMock[i].id].deselectMenu();
    }
    this[item.id].selectMenu();
    this.categorySelected = item.slug;
  }

  getSubCategoryData(subCategory) {
    this.props.getCategory({
      category: this.categorySelected,
      subCategory: subCategory,
  });
  }

  render () {
    return (
      <div>
        {
          menuMock.map((item) =>
            <MainMenuItem
              ref={(c) => { this[item.id] = c; }}
              key={Math.random()}
              menuData={item}
              getSubCategoryData={this.getSubCategoryData}
              onMenuClicked={this.onMenuClicked}
            />
          )
        }
      </div>
    )
  }
}