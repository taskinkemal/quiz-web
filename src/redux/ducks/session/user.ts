import { AsyncAction, Action } from '../../types';
import api, { User } from '../../../api';

// Actions
export const RECEIVE_USER = 'api/session/user/RECEIVE_USER';
type userAction = Action<typeof RECEIVE_USER, User>;

// Reducer
const initialState = {} as User;

export default function reducer(state = initialState, action: userAction) {
  if (action.type === RECEIVE_USER) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
}

// Action Creators
export function receiveUser(user: User) {
  return {
    type: RECEIVE_USER,
    payload: user
  };
}

export function requestUser(): AsyncAction<any> {
  return (dispatch, getState) => {
    const { session, application } = getState();
    const { accessToken } = session;
    const { apiEndpoint } = application;
    const request = api(apiEndpoint).authorize(accessToken!).users;

    return request.me().then((response) => {
      dispatch(receiveUser(response));
      return response;
    });
  };
}
