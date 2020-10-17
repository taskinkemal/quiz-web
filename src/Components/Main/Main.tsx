import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import QuizList from '../QuizList';
import Button from '../../Controls/Button';
import { logoutAndResetApplication } from '../../redux/ducks/application';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

  function Main(props: Props): ReactElement {

    const handleLogout = (): void => {
        props.logout();
    };

    return (
        <div>
            <div>
                <Button
                    value="Logout"
                    onClick={handleLogout}
                />
            </div>
            <div>
                Welcome to Quiz Maker {props.user.firstName}
            </div>
            <QuizList quizzes={props.quizzes} />
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);