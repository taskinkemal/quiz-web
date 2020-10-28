import { AsyncAction, Action } from '../../types';
import api, { QuizMap, Quiz } from '../../../api';
import { setHttpRequestRunning } from '../application';
import { throwGlobalError, GlobalErrorType, showGlobalMessage } from '../globalMessages/globalMessages';

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

export function saveQuiz(quiz: Quiz): AsyncAction {
  return (dispatch, getState) => {
    const { session, application } = getState();
    const { apiEndpoint } = application;

    if (!session.accessToken) {
      return;
    }

    const request = api(apiEndpoint).authorize(session.accessToken);

    dispatch(setHttpRequestRunning(true));

    let promise: undefined | Promise<any>;

    if (quiz.id <= 0) {
      promise = request.quizzes.insert(quiz);
    } else {
      promise = request.quizzes.update(quiz);
    }

    return promise
      .then(() => dispatch(requestQuizzes()))
      .catch((error) => {
        dispatch(throwGlobalError(GlobalErrorType.SaveQuiz));
        throw error;
      })
      .finally(() => dispatch(setHttpRequestRunning(false)))
      .then(() => dispatch(showGlobalMessage("Quiz saved successfully.")));
  };
}