import * as types from './constants';

/**
 *
 * @param options Object
 * @returns {{type, category, subCategory: *}}
 */
export function getCategoryList(options) {
  return {
    type: types.FETCHING_CATEGORY_REQUESTED,
    category: options.category,
    page: options.page,
    per_page: options.per_page,
  };
}

export function cleanCategory() {
  return {
    type: types.CLEAN_CATEGORY,
  }
}


export function selectedPost(post) {
  return {
    type: types.SELECT_POST,
    post: post,
  }
}