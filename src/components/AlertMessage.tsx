import React from 'react';

import { AlertProps } from '../types/global';

const AlertMessage = ({ success, messageText }: AlertProps) => {
  return (
    <div
      className={`text-center alert ${
        success ? 'alert-success py-1' : 'alert-danger'
      }`}
    >
      <small>{messageText}</small>
    </div>
  );
};

export default AlertMessage;
