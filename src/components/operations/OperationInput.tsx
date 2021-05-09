import React from "react";

import { OperationProps } from '../../types/global';

const OperationInput = ({ denomination }: OperationProps) => {
  return (
    <input
      type="number"
      className="form-control"
      data-denominationtype={denomination.type}
      min="0"
      autoFocus={denomination.type === "twenty"}
    />
  );
};

export default OperationInput;
