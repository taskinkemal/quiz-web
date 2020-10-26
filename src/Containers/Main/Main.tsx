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

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

  function Main(props: Props): ReactElement {

    const handleLogout = (): void => {
        props.logout();
    };

    return (
        <HashRouter>
          <NavBar onLogout={handleLogout} />
          <Container className="appWrapper">
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
      }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { session } = state;
    const { user, quiz } = session;
    return {
      user: user,
      quizzes: quiz
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);