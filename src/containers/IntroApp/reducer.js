import * as types from './constants';

const initialState = {
  editor: null,
  recent: {
    posts: [],
  },
  fetching: false,
  fetchingRecent: false,
  count: 0,
  pages: 0,
  category: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_INTRO:
      return {
        ...state,
        fetching: action.fetching,
      };
    case types.FETCHING_RECENT:
      return {
        ...state,
        fetchingRecent: action.fetching,
      };
    case types.FETCHING_INTRO_SUCCEEDED:
      return {
        ...state,
        editor: {
          ...action.editor,
        }
      };
    case types.FETCHING_RECENT_SUCCEEDED:
      return {
        ...state,
        recent: {
          count: action.recent.count,
//           count_total: action.recent.count_total,
          pages: action.recent.pages,
          posts: [
            ...state.recent.posts,
            ...action.recent.posts,
          ]
        },
      };
    default: return state;
  }
}

export default reducer;
