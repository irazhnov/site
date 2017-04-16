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


// export function getCategoriesByPage(options) {
//   return {
//     type: types.FETCHING_PAGINATED_CATEGORY_REQUESTED,
//     category: options.category,
//     subCategory: options.subCategory,
//     pageNumber: options.pageNumber,
//   };
// }
