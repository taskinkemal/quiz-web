import { Action } from '../../types';

// Types

export enum GlobalErrorType {
  Unhandled = 'Unhandled',
  HttpError = 'HttpError',
  SaveQuiz = 'SaveQuiz'
}

// Actions
const THROW_GLOBAL_ERROR = 'app/errors/THROW_GLOBAL_ERROR';
export const RESET_GLOBAL_ERROR = 'app/errors/RESET_GLOBAL_ERROR';

type ErrorsAction =
  | Action<typeof THROW_GLOBAL_ERROR, GlobalErrorType>
  | Action<typeof RESET_GLOBAL_ERROR, GlobalErrorType | undefined>;

// Reducer

interface State {
  readonly globalError?: GlobalErrorType;
}

const initialState: State = {
    globalError: undefined
};

export default function reducer(state = initialState, action: ErrorsAction): State {
  const { globalError } = state;

  switch (action.type) {
    case THROW_GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.payload
      };
    case RESET_GLOBAL_ERROR:
      if ((action.payload !== undefined && globalError === action.payload) || !action.payload) {
        return { ...state, globalError: undefined };
      }
      return { ...state };
    default:
      return state;
  }
}

// Action Creators

export function resetGlobalError(errorType?: GlobalErrorType): ErrorsAction {
  return {
    type: RESET_GLOBAL_ERROR,
    payload: errorType
  };
}

export function throwGlobalError(errorType: GlobalErrorType): ErrorsAction {
  return {
    type: THROW_GLOBAL_ERROR,
    payload: errorType
  };
}
