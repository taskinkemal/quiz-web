import { AsyncAction, Action } from '../../types';
import api, { QuizOptionsMap } from '../../../api';

// Actions
export const RECEIVE_OPTIONS = 'api/session/user/RECEIVE_OPTIONS';
type optionsAction = Action<typeof RECEIVE_OPTIONS, QuizOptionsMap>;

// Reducer
const initialState = {} as QuizOptionsMap;

export default function reducer(state = initialState, action: optionsAction) {
  if (action.type === RECEIVE_OPTIONS) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
}

// Action Creators
export function receiveOptions(quizOptionsMap: QuizOptionsMap) {
  return {
    type: RECEIVE_OPTIONS,
    payload: quizOptionsMap
  };
}

export function requestOptions(quizId: number, questionId: number): AsyncAction<any> {
  return (dispatch, getState) => {
    const { session, application } = getState();
    const { accessToken } = session;
    const { apiEndpoint } = application;
    const request = api(apiEndpoint).authorize(accessToken!).options;

    return request.get(quizId, questionId).then((response) => {
      dispatch(receiveOptions({[quizId]: {[questionId]: response}}));
      return response;
    });
  };
}