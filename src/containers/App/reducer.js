import * as types from './constants';

const initialState = {
  fetching: false,
    count: 0,
    pages: 0,
    category: {},
    posts: [],
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
//     case types.FETCHING_PAGINATED_CATEGORY_SUCCEEDED:
//       return {
//         ...state,
//         feed: {
//           ...state.feed,
//           posts: [
//             ...state.feed.posts,
//             ...action.feed.posts,
//           ]
//         },
//       };
// //
    default:
      return state;
  }
}

export default reducer;
