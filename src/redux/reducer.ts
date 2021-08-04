import { combineReducers } from 'redux';
import accessToken from './ducks/session/token';
import user from './ducks/session/user';
import quiz from './ducks/session/quiz';
import question from './ducks/session/question';
import option from './ducks/session/option';
import application, { ApplicationAction, RESET_APPLICATION_STATE } from './ducks/application';
import globalMessages from './ducks/globalMessages/globalMessages';

const reducer = combineReducers({
  session: combineReducers({
    accessToken,
    user,
    quiz,
    question,
    option
  }),
  application,
  globalMessages
});

const r = (state: ReturnType<typeof reducer>, action: ApplicationAction) => {
  if (action.type === RESET_APPLICATION_STATE) {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

export default r;