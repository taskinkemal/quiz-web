import React, { ReactElement } from 'react';
import styles from './Button.module.scss';
import { Button as BootstrapButton } from 'react-bootstrap';

export interface ButtonProps {
    value: string;
    onClick: () => void;
    isDisabled?: boolean;
  }
  
  function Button(props: ButtonProps): ReactElement {
    const {
      value,
      onClick,
      isDisabled,
      ...rest
    } = props;

    return (
      <BootstrapButton
        className={styles.button}
        {...rest}
        onClick={onClick}
        disabled={isDisabled}
    >{value}</BootstrapButton>
    );
  }

export default Button;