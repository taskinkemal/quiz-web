import React, { ReactElement } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

interface AlertProps {
    message: string;
    onClose: () => void;
    variant: "success" | "danger";
  }

  function Alert(props: AlertProps): ReactElement {
    const {
      message,
      variant,
      onClose,
      ...rest
    } = props;

    return (
      <BootstrapAlert
        variant={variant}
        {...rest}
        onClose={onClose}
        dismissible
    >
        {message}
    </BootstrapAlert>
    );
  }

export default Alert;