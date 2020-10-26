import { combineReducers } from 'redux';
import accessToken from './ducks/session/token';
import user from './ducks/session/user';
import quiz from './ducks/session/quiz';
import application, { ApplicationAction, RESET_APPLICATION_STATE } from './ducks/application';
import errors from './ducks/errors/errors';

const reducer = combineReducers({
  session: combineReducers({
    accessToken,
    user,
    quiz
  }),
  application,
  errors
});

export default (state: ReturnType<typeof reducer>, action: ApplicationAction) => {
  if (action.type === RESET_APPLICATION_STATE) {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};
