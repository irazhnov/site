import * as types from './constants';

export function makeSearch(query, page, per_page) {
  return { type: types.FETCHING_FREE_SEARCH_REQUESTED,
    query: query,
    page: page,
    per_page: per_page,
  };
}

export function cleanSearch() {
  return { type: types.CLEAN_SEARCH,
  };
}

// export function makeSearchByPage(query, pageNum) {
//   return { type: types.FETCHING_PAGINATED_FREE_SEARCH_REQUESTED,
//     query: query,
//     pageNum: pageNum,
//   };
// }