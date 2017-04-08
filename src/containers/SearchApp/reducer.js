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
    case types.FETCHING_PAGINATED_FREE_SEARCH_SUCCEEDED:
      return {
        ...state,
        selected: {
          ...state.selected,
          posts: [
            ...state.selected.posts,
            ...action.selected.posts,
          ]
        },
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
