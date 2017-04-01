import * as types from './constants';

export function getGlucoseControl() {
  return { type: types.FETCHING_GLUC_CONTROL_SETTINGS_REQUESTED };
}

export function getCategoryList(options) {
  return {
    type: types.FETCHING_CATEGORY_REQUESTED,
    category: options.category,
    subCategory: options.subCategory,
  };
}
