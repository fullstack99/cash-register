import React from 'react';

import { TotalProps } from '../types/global';

const RegisterTotal = ({ total }: TotalProps) => {
  return (
    <div className="col-sm-6 text-center">
      <h3 className="display-4">Total</h3>
      <h2 className="display-3">${total}</h2>
    </div>
  );
};

export default RegisterTotal;
