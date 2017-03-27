import * as types from './constants';

export function getPosts() {
  return { type: types.FETCHING_POSTS_SETTINGS_REQUESTED };
}



export function getUserSettings() {
  return { type: types.FETCHING_USER_SETTINGS_REQUESTED };
}

export function updateUserSettings(form) {
  return {
    type: types.UPDATING_USER_SETTINGS_REQUESTED,
    form: {
      folders: form.folders,
      preferredChannels: form.preferredChannels,
      defaultPlus: form.defaultPlus,
    },
  };
}

export function getCurrentUser() {
  return { type: types.FETCHING_USER_REQUESTED };
}

export function getChannels() {
  return { type: types.FETCHING_CHANNELS_REQUESTED };
}

export function setPopupVisibility(isOpened) {
  return { type: types.SET_POPUP_VISIBILITY, isOpened };
}

export function addNotification(opts) {
  return { type: types.ADD_NOTIFICATION, opts };
}

export function addChannel(tag) {
  return { type: types.ADD_CHANNEL, tag };
}

export function removeChannel(tag) {
  return { type: types.REMOVE_CHANNEL, tag };
}

export function setDefaultPlus(value) {
  return { type: types.SET_DEFAULT_PLUS, value };
}