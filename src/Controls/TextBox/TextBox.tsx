import React, { useEffect, useRef, ReactElement } from 'react';
import styles from './TextBox.module.scss';

export interface TextBoxProps {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    isPassword?: boolean;
    autoFocus?: boolean;
    isDisabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
  }
  
  function TextBox(props: TextBoxProps): ReactElement {
    const {
      isPassword,
      placeholder,
      value,
      onChange,
      isDisabled,
      autoFocus,
      maxLength,
      readOnly,
      ...rest
    } = props;
    const inputReference = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (autoFocus && inputReference && inputReference.current) {
        inputReference.current.focus();
      }
    }, [autoFocus, inputReference]);
  
    return (
        <input
          ref={inputReference}
          className={styles.textBox}
          {...rest}
          type={isPassword ? 'password' : 'text'}
          placeholder={placeholder}
          value={value}
          onChange={e => { if (onChange) onChange(e.currentTarget.value); }}
          disabled={isDisabled}
          maxLength={maxLength}
          readOnly={readOnly}
        />
    );
  }

export default TextBox;