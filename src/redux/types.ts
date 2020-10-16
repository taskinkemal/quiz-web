import { ThunkAction } from 'redux-thunk';
import { Action as ReduxAction, AnyAction } from 'redux';
import reducer from './reducer';

export interface Action<Type extends string, Payload = undefined, Meta = unknown> extends AnyAction {
  type: Type;
  payload: Payload;
  error?: boolean;
  meta?: Meta;
}

export type AsyncAction<R = void> = ThunkAction<R, AppState, null, ReduxAction<string>>;

export type AppState = ReturnType<typeof reducer>;