import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Login, Main } from './Containers';
import { AppState } from './redux/types';
import { requestAccessTokenValidation } from './redux/ducks/session/token';
import { logoutAndResetApplication, reInitApplication } from './redux/ducks/application';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function App(props: Props) {
  const { isInitialized, hasAccessToken } = props;
  return (
    <div className="App">
    <>
      {!isInitialized && <div>Initializing...</div>}
      {isInitialized && !hasAccessToken && <Login />}
      {isInitialized && hasAccessToken && <Main />}
    </>
    </div>
  );
}

function mapStateToProps(state: AppState) {
  const { application, session } = state;
  return {
    isInitialized: application.initialized,
    accessToken: session.accessToken,
    hasAccessToken: !!session.accessToken
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    validateAccessToken: (accessToken: string | undefined, loginOnSuccess: boolean, logoutOnFail: boolean) => {
      return dispatch(requestAccessTokenValidation(accessToken!)).then((accessTokenIsValid: boolean) => {
        if (accessTokenIsValid) {
          if (loginOnSuccess) {
            dispatch(reInitApplication());
          }
        } else if (logoutOnFail) {
          dispatch(logoutAndResetApplication());
        }
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
