import * as types from './constants';

export function getCategoryList(options) {
  return {
    type: types.FETCHING_CATEGORY_REQUESTED,
    category: options.category,
    subCategory: options.subCategory,
  };
}
