import * as types from './constants';

const initialState = {
  fetching: false,
  count: 0,
  count_total: null,
  pages: 0,
  posts: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_FREE_SEARCH:
      return {
        ...state,
        fetching: action.fetching,
      };
    case types.FETCHING_FREE_SEARCH_SUCCEEDED:
      return {
        ...state,
        count: action.selected.count,
        count_total: action.selected.count_total,
          posts: [
            ...action.selected.posts,
          ]
      };
    case types.CLEAN_SEARCH:
      return {
        ...initialState,
      };
    case types.FETCHING_FREE_SEARCH_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;
