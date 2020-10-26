import React, { useEffect, useRef, ReactElement } from 'react';
import { Form } from 'react-bootstrap';

export interface TextBoxProps {
    value: string;
    rows: number;
    onChange?: (value: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    isDisabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
  }
  
  function TextArea(props: TextBoxProps): ReactElement {
    const {
      placeholder,
      value,
      onChange,
      isDisabled,
      autoFocus,
      maxLength,
      readOnly,
      rows,
      ...rest
    } = props;
    const inputReference = useRef<HTMLTextAreaElement>(null);
  
    useEffect(() => {
      if (autoFocus && inputReference && inputReference.current) {
        inputReference.current.focus();
      }
    }, [autoFocus, inputReference]);
  
    return (
      <Form.Control
      as="textarea"
      rows={rows}
      ref={inputReference}
      {...rest}
      placeholder={placeholder}
      onChange={e => { if (onChange) onChange(e.currentTarget.value); }}
      disabled={isDisabled}
      maxLength={maxLength}
      readOnly={readOnly}
      value={value}
      />
    );
  }

export default TextArea;