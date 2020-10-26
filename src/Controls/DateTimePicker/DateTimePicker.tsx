import React, { ReactElement } from 'react';
import ReactDatePicker from 'react-datepicker';
import styles from './DateTimePicker.module.scss';
import classNames from 'classnames';

export interface DateTimePickerProps {
    value: Date | null;
    onChange?: (value?: Date) => void;
    isDisabled?: boolean;
    showTimeSelect?: boolean;
  }
  
  function DateTimePicker(props: DateTimePickerProps): ReactElement {
    const {
      value,
      onChange,
      isDisabled,
      showTimeSelect,
      ...rest
    } = props;
  
    return (
      <ReactDatePicker
      {...rest}
      showTimeSelect={showTimeSelect}
      selected={value}
      onChange={v => { if (v instanceof Date || !v) {
            if (onChange) onChange(v ? v : undefined);
          }
        }
      }
      disabled={isDisabled}
      dateFormat="MMMM d, yyyy h:mm"
      className={classNames("form-control", styles.datePickerInput)}
      />
    );
  }

export default DateTimePicker;