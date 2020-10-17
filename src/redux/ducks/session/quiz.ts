import { AsyncAction, Action } from '../../types';
import api, { QuizMap } from '../../../api';

// Actions
export const RECEIVE_QUIZZES = 'api/session/user/RECEIVE_QUIZZES';
type quizzesAction = Action<typeof RECEIVE_QUIZZES, QuizMap>;

// Reducer
const initialState = {} as QuizMap;

export default function reducer(state = initialState, action: quizzesAction) {
  if (action.type === RECEIVE_QUIZZES) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
}

// Action Creators
export function receiveQuizzes(quizMap: QuizMap) {
  return {
    type: RECEIVE_QUIZZES,
    payload: quizMap
  };
}

export function requestQuizzes(): AsyncAction<any> {
  return (dispatch, getState) => {
    const { session, application } = getState();
    const { accessToken } = session;
    const { apiEndpoint } = application;
    const request = api(apiEndpoint).authorize(accessToken!).quizzes;

    return request.get().then((response) => {
      dispatch(receiveQuizzes(response));
      return response;
    });
  };
}
