import React from "react";
import RegisterTotal from "./RegisterTotal";
import Denomination from "./denominations/Denomination";
import { Demonination, DenominationListProps } from '../types/global'

const BalanceSheet = ({ denominations, onDenominationChange }: DenominationListProps) => {
  const denominationItems = denominations.map((denomination: Demonination, index: number) => {
    return (
      <Denomination
        denomination={denomination}
        key={index}
        isBalanceSheet={true}
        onDenominationChange={onDenominationChange}
      />
    );
  });

  const calculateTotal = (denominations: Demonination[]) => {
    return denominations
      .map((denomination: Demonination) => {
        return denomination.value * denomination.count;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0);
  };

  return (
    <div className="col-md-8 position-relative mt-5 floating-label-panel balance-sheet">
      <div className="border border-light shadow-sm rounded p-4 pt-5">
        <div className="h2 bg-dark text-light px-2 mb-0">
          Register Balance
        </div>
        <div className="row">
          <RegisterTotal total={calculateTotal(denominations)} />
          <div className="col-sm-6">
            <table className="table table-sm mb-0">
              <thead>
                <tr>
                  <th scope="col">Denomination</th>
                  <th scope="col">Count</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>{denominationItems}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;
