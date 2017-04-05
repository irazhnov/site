import * as types from './constants';

const initialState = {
  fetching: false,
  selected: {
    posts: [],
  },
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
        selected: action.selected,
      };
    case types.CLEAN_SEARCH:
    case types.FETCHING_FREE_SEARCH_FAILED:
      return {
        ...state,
        selected: {
          posts:[],
        },
      };
    default:
      return state;
  }
}

export default reducer;
