import { Action } from '../../types';

// Types

export enum GlobalErrorType {
  Unhandled = 'Unhandled',
  HttpError = 'HttpError',
  SaveQuiz = 'SaveQuiz'
}

export interface GlobalMessage {
  message?: string;
  errorType?: GlobalErrorType;
}

// Actions
const SHOW_GLOBAL_MESSAGE = 'app/errors/SHOW_GLOBAL_MESSAGE';
export const RESET_GLOBAL_MESSAGE = 'app/errors/RESET_GLOBAL_MESSAGE';

type ErrorsAction =
  | Action<typeof SHOW_GLOBAL_MESSAGE, GlobalMessage>
  | Action<typeof RESET_GLOBAL_MESSAGE, GlobalMessage | undefined>;

// Reducer

interface State {
  readonly globalMessage?: GlobalMessage;
}

const initialState: State = {
  globalMessage: undefined
};

export default function reducer(state = initialState, action: ErrorsAction): State {

  switch (action.type) {
    case SHOW_GLOBAL_MESSAGE:
      return {
        ...state,
        globalMessage: action.payload
      };
    case RESET_GLOBAL_MESSAGE:
      return {
        ...state,
        globalMessage: undefined
      };
    default:
      return state;
  }
}

// Action Creators

export function resetGlobalMessage(): ErrorsAction {
  return {
    type: RESET_GLOBAL_MESSAGE,
    payload: undefined
  };
}

export function throwGlobalError(errorType: GlobalErrorType): ErrorsAction {
  return {
    type: SHOW_GLOBAL_MESSAGE,
    payload: { errorType: errorType }
  };
}

export function showGlobalMessage(message: string): ErrorsAction {
  return {
    type: SHOW_GLOBAL_MESSAGE,
    payload: { message: message }
  };
}
