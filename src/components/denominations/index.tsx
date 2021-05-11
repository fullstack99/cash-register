import React from 'react';

import DenominationPage from './Denomination';
import { Denomination, DenominationListProps } from '../../types/global';

const DenominationList = ({
  denominations,
  onDenominationChange
}: DenominationListProps) => {
  const denominationItems = denominations.map(
    (denomination: Denomination, index: number) => {
      return (
        <DenominationPage
          denomination={denomination}
          key={index}
          isBalanceSheet={false}
          onDenominationChange={onDenominationChange}
        />
      );
    }
  );

  return (
    <div className="denominations-list floating-label-panel position-relative mt-5">
      <div className="border border-light shadow-sm rounded p-4 pt-5">
        <div className=" h2 bg-dark text-light px-2 mb-5">Denominations</div>
        <div className="row">{denominationItems}</div>
      </div>
    </div>
  );
};

export default DenominationList;
