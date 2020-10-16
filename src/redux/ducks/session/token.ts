import { AsyncAction, Action } from '../../types';
import api from '../../../api';

// Actions
const RECEIVE_ACCESS_TOKEN = 'api/session/token/RECEIVE_ACCESS_TOKEN';
const DELETE_ACCESS_TOKEN = 'api/session/token/DELETE_ACCESS_TOKEN';
type tokenAction = Action<typeof RECEIVE_ACCESS_TOKEN, string> | Action<typeof DELETE_ACCESS_TOKEN>;

// Reducer
const initialState = null as string | null;

export default function reducer(state = initialState, action: tokenAction) {
  switch (action.type) {
    case RECEIVE_ACCESS_TOKEN:
      return action.payload;
    case DELETE_ACCESS_TOKEN:
      return initialState;
    default:
      return state;
  }
}

// Action Creators
export function receiveAccessToken(accessToken: string) {
  return {
    type: RECEIVE_ACCESS_TOKEN,
    payload: accessToken
  };
}

export function deleteAccessToken() {
  return {
    type: DELETE_ACCESS_TOKEN
  };
}

export function requestAccessToken(
  email: string,
  password: string,
  deviceId: string,
  rememberMe = false
): AsyncAction<Promise<string>> {
  return async (_dispatch, getState) =>
    api(getState().application.apiEndpoint).token.create(email, password, deviceId, rememberMe);
}

export function requestAccessTokenDeletion(accessToken: string): AsyncAction<Promise<boolean>> {
  return (_dispatch, getState) => api(getState().application.apiEndpoint).token.delete(accessToken);
}

export function requestAccessTokenValidation(accessToken: string): AsyncAction<Promise<boolean>> {
  return (_dispatch, getState) => api(getState().application.apiEndpoint).token.validate(accessToken);
}
