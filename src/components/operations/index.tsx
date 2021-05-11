import React, { useState } from 'react';

import ShowMessage from '../Message';
import {
  OperationResult,
  Denomination,
  DenominationsProps
} from '../../types/global';
import '../../assets/css/operations.css';

const Operations = ({
  denominations,
  onDenominationsChange
}: DenominationsProps) => {
  const [mode, setMode] = useState('add');
  const [operationResult, setOperationResult] = useState<OperationResult[]>([]);

  const formForMode = () => {
    const inputLabels = denominations.map(
      (denomination: Denomination, i: number) => (
        <div className="col-2 text-muted p-0 text-center" key={i}>
          <small> ${denomination.value}s </small>
        </div>
      )
    );

    const inputs = denominations.map(
      (denomination: Denomination, i: number) => (
        <input
          type="number"
          className="form-control"
          data-denominationtype={denomination.type}
          min="0"
          autoFocus={denomination.type === 'twenty'}
          key={i}
        />
      )
    );

    switch (mode) {
      case 'add':
        return (
          <form
            id="addDenominations"
            className="mt-4"
            onSubmit={(e) => addDenominationsToRegister(e)}
          >
            <div className="row mx-1 text-center">{inputLabels}</div>
            <div className="input-group shadow">{inputs}</div>
            <button
              className="btn btn-dark shadow my-0 btn-block btn-flat-top"
              type="submit"
            >
              <span className="oi oi-plus mr-2"></span>
              Add Denominations
            </button>
            <p className="text-center text-muted">
              <small>
                Enter number of $20s, $10s, $5s, $2s and $1s to{' '}
                <span className="text-success">add</span>
              </small>
            </p>
          </form>
        );
      case 'change':
        return (
          <form
            id="getChangeForm"
            className="mb-4"
            onSubmit={(e) => getChange(e)}
          >
            <div className="input-group mt-4 shadow">
              <input type="number" className="form-control" min="0" autoFocus />
            </div>
            <button
              className="btn btn-dark shadow my-0 btn-block btn-flat-top"
              type="submit"
            >
              Get Change
            </button>
            <p className="text-center text-muted">
              <small>Enter the dollar amount needed in change</small>
            </p>
          </form>
        );
      default:
        return <div className="mt-4"></div>;
    }
  };

  const getChange = (e: any) => {
    e.preventDefault();

    let changeAmt = parseInt(e.target.querySelector('input').value, 10);
    let denominationsToMakeChange: any = [],
      countByDenominationType: any = {};

    // check if we have enough cash
    if (changeAmt > calculateTotal()) {
      setOperationResult([
        { success: false, type: 'Not enough cash!', denominations: [] }
      ]);
      return;
    }

    denominations.forEach((denomination: Denomination) => {
      let countToReturn = 0;
      let denominationCount = denomination.count;

      while (changeAmt >= denomination.value && denominationCount > 0) {
        changeAmt -= denomination.value;
        denominationCount--;
        countToReturn++;
      }

      if (countToReturn > 0) {
        denominationsToMakeChange.push({
          type: denomination.type,
          count: countToReturn
        });
        countByDenominationType[denomination.type] = countToReturn;
      }
    });

    if (changeAmt > 0) {
      setOperationResult([
        { success: false, type: 'Cannot make change!', denominations: [] }
      ]);
    } else {
      takeDenominationsFromRegister(
        countByDenominationType,
        denominationsToMakeChange,
        []
      );
    }

    // reset the form
    e.target.reset();
  };

  const takeDenominationsFromRegister = (
    countByDenominationType: any,
    denominationsToTake: Denomination[],
    denominationsToReject: Denomination[]
  ) => {
    let operationResultArr: OperationResult[] = [];

    denominations.map((denomination: Denomination) => {
      return (denomination.count -=
        countByDenominationType[denomination.type] || 0);
    });

    onDenominationsChange(denominations);

    if (denominationsToTake.length) {
      operationResultArr.push({
        success: true,
        type: 'Took',
        denominations: denominationsToTake
      });
    }
    if (denominationsToReject.length) {
      operationResultArr.push({
        success: false,
        type: 'Not Enough Bills to take',
        denominations: denominationsToReject
      });
    }

    setOperationResult(operationResultArr);
  };

  const addDenominationsToRegister = (e: any) => {
    e.preventDefault();

    const countByDenominationType: any = {};
    let addedDenominations: any = [],
      operationResultArr: OperationResult[] = [];

    e.target.querySelectorAll('input').forEach((input: any) => {
      const count = parseInt(input.value, 10) || 0;

      countByDenominationType[input.dataset.denominationtype] = count;
      if (count > 0) {
        addedDenominations.push({
          type: input.dataset.denominationtype,
          count: count
        });
      }
    });

    denominations.map((denomination: Denomination) => {
      return (denomination.count += countByDenominationType[denomination.type]);
    });
    onDenominationsChange(denominations);

    if (addedDenominations.length) {
      operationResultArr.push({
        success: true,
        type: 'Added',
        denominations: addedDenominations
      });
    }

    setOperationResult(operationResultArr);

    e.target.reset();
  };

  const calculateTotal = () => {
    return denominations
      .map((denomination: Denomination) => {
        return denomination.value * denomination.count;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0);
  };

  return (
    <div className="col-md-4 mt-5 register-operations floating-label-panel">
      <div className="border border-light shadow-sm rounded p-4 pt-5">
        <div className="h2 bg-dark text-light px-2 mb-0">Operations</div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link btn btn-link ${
                mode === 'add' ? 'active bg-dark text-light' : ''
              }`}
              onClick={() => {
                setMode('add');
                setOperationResult([]);
              }}
            >
              Add
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn btn-link ${
                mode === 'change' ? 'active bg-dark text-light' : ''
              }`}
              onClick={() => {
                setMode('change');
                setOperationResult([]);
              }}
            >
              Change
            </button>
          </li>
        </ul>
        {formForMode()}
        <ShowMessage operationResult={operationResult} />
      </div>
    </div>
  );
};

export default Operations;
