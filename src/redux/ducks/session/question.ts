import { AsyncAction, Action } from '../../types';
import api, { QuizQuestionsMap, Question } from '../../../api';
import { setHttpRequestRunning } from '../application';
import { throwGlobalError, GlobalErrorType, showGlobalMessage } from '../globalMessages/globalMessages';

// Actions
export const RECEIVE_QUESTIONS = 'api/session/user/RECEIVE_QUESTIONS';
type questionsAction = Action<typeof RECEIVE_QUESTIONS, QuizQuestionsMap>;

// Reducer
const initialState = {} as QuizQuestionsMap;

export default function reducer(state = initialState, action: questionsAction) {
  if (action.type === RECEIVE_QUESTIONS) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
}

// Action Creators
export function receiveQuestions(quizQuestionMap: QuizQuestionsMap) {
  return {
    type: RECEIVE_QUESTIONS,
    payload: quizQuestionMap
  };
}

export function requestQuestions(quizId: number): AsyncAction<any> {
  return (dispatch, getState) => {
    const { session, application } = getState();
    const { accessToken } = session;
    const { apiEndpoint } = application;
    const request = api(apiEndpoint).authorize(accessToken!).questions;

    return request.get(quizId).then((response) => {
      dispatch(receiveQuestions({[quizId]: response}));
      return response;
    });
  };
}

export function saveQuestion(quizId: number, question: Question): AsyncAction {
  return (dispatch, getState) => {
    const { session, application } = getState();
    const { apiEndpoint } = application;

    if (!session.accessToken) {
      return;
    }

    const request = api(apiEndpoint).authorize(session.accessToken);

    dispatch(setHttpRequestRunning(true));

    let promise: undefined | Promise<any>;

    if (question.id <= 0) {
      promise = request.questions.insert(quizId, question);
    } else {
      promise = request.questions.update(quizId, question);
    }

    return promise
      .then(() => dispatch(requestQuestions(quizId)))
      .catch((error) => {
        dispatch(throwGlobalError(GlobalErrorType.SaveQuiz));
        throw error;
      })
      .finally(() => dispatch(setHttpRequestRunning(false)))
      .then(() => dispatch(showGlobalMessage("Question saved successfully.")));
  };
}