import React, { ReactElement } from 'react';
import {
    Route,
    HashRouter
  } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { NavBar } from '../../Components';
import { logoutAndResetApplication } from '../../redux/ducks/application';
import { About, QuizList, QuizEdit, Home } from '..';
import { Container } from 'react-bootstrap';
import { Alert } from '../../Controls';
import { resetGlobalMessage } from '../../redux/ducks/globalMessages/globalMessages';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

  function Main(props: Props): ReactElement {

    const { globalMessage } = props;

    const handleLogout = (): void => {
        props.logout();
    };

    const handleGlobalMessageClose = (): void => {
      props.closeGlobalMessage();
    };

    return (
        <HashRouter>
          <NavBar onLogout={handleLogout} />
          <Container className="appWrapper">
          {globalMessage &&
              <Alert
                message={globalMessage.message ? globalMessage.message : "An error occured." }
                variant={globalMessage.errorType ? "danger" : "success"}
                onClose={handleGlobalMessageClose}
              />
          }
            <Route path="/" component={Home} exact push />
            <Route path="/quizzes" component={QuizList} exact />
            <Route path={`/Quizzes/:quizId`} component={QuizEdit} />
            <Route path="/about" component={About} />
          </Container>
      </HashRouter>
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    logout: () => {
        return dispatch(logoutAndResetApplication());
      },
    closeGlobalMessage: () => {
      return dispatch(resetGlobalMessage());
    }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { session, globalMessages } = state;
    const { user, quiz } = session;
    return {
      user: user,
      quizzes: quiz,
      globalMessage: globalMessages.globalMessage
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);