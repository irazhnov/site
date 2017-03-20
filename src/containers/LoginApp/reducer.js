import * as types from './constants';
//import auth from './auth';

const initialState = {
  formState: {
    username: '',
    password: '',
  },
  error: '',
  currentlySending: false,
  loggedIn: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_FORM:
      return { ...state, formState: action.newFormState };
    case types.SET_AUTH:
      return { ...state, loggedIn: action.newAuthState };
    case types.SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case types.REQUEST_ERROR:
      return { ...state, error: action.payload.message };
    case types.CLEAR_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
}

export default reducer;
