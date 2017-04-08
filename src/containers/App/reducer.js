import * as types from './constants';

const initialState = {
  fetching: false,
  feed: {},
  selected: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_CATEGORY_SUCCEEDED:
      return {
        ...state,
        feed: action.feed,
      };
    case types.FETCHING_CATEGORY:
      return {
        ...state,
        fetching: action.fetching,
      };
    case types.FETCHING_PAGINATED_CATEGORY_SUCCEEDED:
      return {
        ...state,
        feed: {
          ...state.feed,
          posts: [
            ...state.feed.posts,
            ...action.feed.posts,
          ]
        },
      };
//
//     case types.REMOVE_CHANNEL:
//       return {
//         ...state,
//         preferredChannels: state.preferredChannels.filter(item =>
//           item.relatedObjectId !== action.tag.relatedObjectId),
//       };
//     case types.FETCHING_USER_SUCCEEDED:
//       return { ...state, user: action.user };
//     case types.SET_POPUP_VISIBILITY:
//       return { ...state, isPopupOpened: action.isOpened };
//     case types.ADD_NOTIFICATION:
//       return {
//         ...state,
//         notification: {
//           ...action.opts,
//           id: (+new Date()).toString(),
//         },
//       };
    default:
      return state;
  }
}

export default reducer;
