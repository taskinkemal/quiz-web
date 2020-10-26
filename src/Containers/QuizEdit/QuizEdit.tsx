import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { logoutAndResetApplication } from '../../redux/ducks/application';
import { match } from 'react-router';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & match;

  function QuizEdit(props: Props): ReactElement {

    console.log(props);
    return (
        <div>
            Quiz Edit TODO
        </div>
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    logout: () => {
        return dispatch(logoutAndResetApplication());
      }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { application, session } = state;
    const { user, quiz } = session;
    return {
      isInitialized: application.initialized,
      user: user,
      quizzes: quiz
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizEdit);