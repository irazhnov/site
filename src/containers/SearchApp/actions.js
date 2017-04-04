import * as types from './constants';

export function makeSearch(query) {
  return { type: types.FETCHING_FREE_SEARCH_REQUESTED,
    query: query,
  };
}