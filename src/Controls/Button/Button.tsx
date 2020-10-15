import React, { ReactElement } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
    value: string;
    onClick: () => void;
    isDisabled?: boolean;
    readOnly?: boolean;
  }
  
  function Button(props: ButtonProps): ReactElement {
    const {
      value,
      onClick,
      isDisabled,
      readOnly,
      ...rest
    } = props;

    return (
        <input
          className={styles.button}
          {...rest}
          value={value}
          onClick={onClick}
          disabled={isDisabled}
          readOnly={readOnly}
          type="button"
        />
    );
  }

export default Button;