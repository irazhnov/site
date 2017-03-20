import * as types from './constants';
import { GENERAL } from '../WriterApp/constants';
import channelsIconsMap from '../../components/TagsItem/channelsIconsMap';

const initialState = {
  folders: [],
  user: {},
  isPopupOpened: false,
  notification: {},
  channels: [],
  preferredChannels: [],
  defaultPlus: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_DEFAULT_PLUS:
      return {
        ...state,
        defaultPlus: action.value,
      };
    case types.FETCHING_USER_SETTINGS_SUCCEEDED:
      return {
        ...state,
        folders: action.userSettings.settings.folders || [],
        preferredChannels: action.userSettings.settings.preferredChannels || [],
        defaultPlus: action.userSettings.settings.defaultPlus || false,
      };
    case types.FETCHING_CHANNELS_SUCCEEDED:
      return {
        ...state,
        channels: action.channels.items.map((channel) => {
          return {
            ...channel,
            type: channel.storagePartitionType,
            icon: channelsIconsMap[channel.name],
          };
        }),
      };
    case types.UPDATING_USER_SETTINGS_SUCCEEDED:
      return {
        ...state,
        folders: action.updatedSettings.settings.folders,
        preferredChannels: action.updatedSettings.settings.preferredChannels,
      };
    case types.ADD_CHANNEL:
      return { ...state,
        preferredChannels: [
          ...state.preferredChannels,
          {
            relationType: GENERAL,
            relatedObjectType: action.tag.type,
            relatedObjectId: action.tag.id,
            relatedObjectName: action.tag.name,
          },
        ],
      };
    case types.REMOVE_CHANNEL:
      return {
        ...state,
        preferredChannels: state.preferredChannels.filter(item =>
          item.relatedObjectId !== action.tag.relatedObjectId),
      };
    case types.FETCHING_USER_SUCCEEDED:
      return { ...state, user: action.user };
    case types.SET_POPUP_VISIBILITY:
      return { ...state, isPopupOpened: action.isOpened };
    case types.ADD_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...action.opts,
          id: (+new Date()).toString(),
        },
      };
    default:
      return state;
  }
}

export default reducer;
