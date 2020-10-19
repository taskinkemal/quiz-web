import React, { ReactElement } from 'react';
import {
    Route,
    Link,
    HashRouter
  } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { Button } from '../../Controls';
import { logoutAndResetApplication } from '../../redux/ducks/application';
import { About, QuizList, Home } from '..';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

  function Main(props: Props): ReactElement {

    const handleLogout = (): void => {
        props.logout();
    };

    return (
        <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quizzes">Quizzes</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div>
                <Button
                    value="Logout"
                    onClick={handleLogout}
                />
        </div>
            <Route path="/" component={Home} exact push />
            <Route path="/" component={Home} exact push />
          <Route path="/quizzes" component={QuizList} />
          <Route path="/about" component={About} />
      </HashRouter>
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