import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import styles from './Login.module.scss';
import { TextBox, Button } from '../../Controls';
import { login } from '../../redux/ducks/application';
import { AppState } from '../../redux/types';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;


  function Login(props: Props): ReactElement {

    const [email, setEmail] = useState('kemal.n.taskin@gmail.com');
    const [password, setPassword] = useState('kemal123');
  
    const handleEmailChange = (value: string): void => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string): void => {
        setPassword(value);
    };

    const handleSignIn = (): void => {
        props.login(email, password, true);
    };

    return (
        <div className={styles.loginPage}>
        <div>
            <div>Quiz Maker</div>
            <div>
            <TextBox
                value={email}
                onChange={handleEmailChange}
                autoFocus
                placeholder="Email"
            />
</div>
<div>
            <TextBox
                value={password}
                onChange={handlePasswordChange}
                isPassword
                placeholder="Password"
            />
            </div>
            <div>
            <Button
                value="Sign in"
                onClick={handleSignIn}
            />
            </div>
        </div>
</div>
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    login: (email: string, password: string, rememberMe: boolean) => {
      return dispatch(login(email, password, rememberMe));
    }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { application } = state;
    return {
      isInitialized: application.initialized
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);