import React, { useState, useEffect } from 'react';
import Operations from './components/operations';
import BalanceSheet from './components/BalanceSheet';
import DenominationList from './components/denominations';
import { Denomination } from './types/global';

const DenominationValues = [
  { type: '$20', value: 20, count: 0, label: 'twenty' },
  { type: '$10', value: 10, count: 0, label: 'ten' },
  { type: '$5', value: 5, count: 0, label: 'five' },
  { type: '$2', value: 2, count: 0, label: 'two' },
  { type: '$1', value: 1, count: 0, label: 'one' }
];

const App = () => {
  const [denominations, setDenominations] = useState<Denomination[]>([]);

  useEffect(() => {
    setDenominations(DenominationValues);
  }, []);

  const updateDenominations = (updatedDenomination: Denomination) => {
    setDenominations(
      denominations.map((denomination: Denomination) => {
        return updatedDenomination.type === denomination.type
          ? updatedDenomination
          : denomination;
      })
    );
  };

  return (
    <div className="container pb-5">
      <div className="row">
        <BalanceSheet
          denominations={denominations}
          onDenominationChange={(updatedDenomination: Denomination) =>
            updateDenominations(updatedDenomination)
          }
        />
        <Operations
          denominations={denominations}
          onDenominationsChange={(denominations: Denomination[]) =>
            setDenominations([...denominations])
          }
        />
      </div>
      <DenominationList
        denominations={denominations}
        onDenominationChange={(updatedDenomination: Denomination) =>
          updateDenominations(updatedDenomination)
        }
      />
    </div>
  );
};

export default App;
