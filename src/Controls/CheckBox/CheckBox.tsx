import React, { useEffect, useRef, ReactElement } from 'react';
import { Form } from 'react-bootstrap';

export interface CheckBoxProps {
    isChecked: boolean;
    label: string;
    onChange?: (value: boolean) => void;
    autoFocus?: boolean;
    isDisabled?: boolean;
  }
  
  function CheckBox(props: CheckBoxProps): ReactElement {
    const {
      isChecked,
      label,
      onChange,
      isDisabled,
      autoFocus,
      ...rest
    } = props;
    const inputReference = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (autoFocus && inputReference && inputReference.current) {
        inputReference.current.focus();
      }
    }, [autoFocus, inputReference]);
  
    return (
      <Form.Check
      ref={inputReference}
      {...rest}
      type="checkbox"
      label={label}
      onChange={e => { if (onChange) onChange(e.currentTarget.checked); }}
      disabled={isDisabled}
      defaultChecked={isChecked}
      />
    );
  }

export default CheckBox;