import React, { ReactElement, useState } from 'react';
import styles from './Login.module.scss';
import TextBox from '../../Controls/TextBox';
import Button from '../../Controls/Button';

  function Login(): ReactElement {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (value: string): void => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string): void => {
        setPassword(value);
    };

    const handleSignIn = (): void => {

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

export default Login;