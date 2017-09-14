import * as types from './constants';

export function getEditorPost() {
  return {
    type: types.FETCHING_INTRO_REQUESTED,
    category: types.EDITOR_CATEGORY,
    page: 1,
    per_page: 1,
  };
}

export function getRecentPosts(page = 1, per_page = 1) {
  return {
    type: types.FETCHING_RECENT_REQUESTED,
    page: page,
    per_page: per_page,
  };
}

export function getGeo() {
  return {
   type: types.GEO_REQUESTED,
  }
}
