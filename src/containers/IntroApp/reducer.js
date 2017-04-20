import * as types from './constants';

const initialState = {
  editor: null,
  recent: null,
  fetching: false,
  count: 0,
  pages: 0,
  category: {},
  posts: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_INTRO:
      return {
        ...state,
        fetching: action.fetching,
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
          ...action.recent,
        }
      };
    default: return state;
  }
}

export default reducer;
