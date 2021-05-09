import React from "react";

import { OperationProps } from '../../types/global';

const OperationInputLabel = ({ denomination }: OperationProps) => {
  return (
    <div className="col-2 text-muted p-0 text-center">
      <small> ${denomination.value}s </small>
    </div>
  );
};

export default OperationInputLabel;
