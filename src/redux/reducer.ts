import { combineReducers } from 'redux';
import accessToken from './ducks/session/token';
import application, { ApplicationAction, RESET_APPLICATION_STATE } from './ducks/application';

const reducer = combineReducers({
  session: combineReducers({
    accessToken
  }),
  application
});

export default (state: ReturnType<typeof reducer>, action: ApplicationAction) => {
  if (action.type === RESET_APPLICATION_STATE) {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};
