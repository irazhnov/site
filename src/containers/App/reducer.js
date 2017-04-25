import * as types from './constants';

const initialState = {
  intro: null,
  fetching: false,
  count: 0,
  pages: 0,
  category: {},
  posts: [],
  selectedPost: {
    thumbnail: '',
    date: {},
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_CATEGORY_SUCCEEDED:
      return {
        ...state,
          count: action.feed.count,
          pages: action.feed.pages,
          category: action.feed.category,
          posts: [
            ...state.posts,
            ...action.feed.posts,
          ]
      };
    case types.FETCHING_CATEGORY:
      return {
        ...state,
        fetching: action.fetching,
      };
    case types.CLEAN_CATEGORY:
      return {
        ...state,
        fetching:false,
        count: 0,
        pages: 0,
        category: {},
        posts: [],
      };
    case types.FETCHING_INTRO_SUCCEEDED:
      return {
        ...state,
        intro: {
          editor: action.intro.editor,
          recent: action.intro.recent,
        },
      };
    case types.SELECT_POST:
      return {
        ...state,
        selectedPost: action.post ? action.post : initialState.selectedPost,
      };
    default:
      return state;
  }
}

export default reducer;
