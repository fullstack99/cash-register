import React, { useEffect, useState } from "react";
import { DenominationProps } from '../../types/global'
import "../../assets/css/denominations.css";

const Denomination = ({ denomination, isBalanceSheet, onDenominationChange }: DenominationProps) => {
  const [isBalance, setIsBalanceSheet] = useState(false)
  const [denominationiImageURL, setDenominationiImageURL] = useState('')

  useEffect(() => {
    setDenominationiImageURL(`${process.env.PUBLIC_URL
      }/denomination_images/${denomination.label.toLowerCase()}.jpg`)
    setIsBalanceSheet(isBalanceSheet)
  }, [denomination, isBalanceSheet])


  const addDenomination = () => {
    denomination.count++;
    onDenominationChange(denomination);
  }

  const subtractDenomination = () => {
    if (denomination.count > 0) {
      denomination.count--;
      onDenominationChange(denomination);
    } else {
    }
  }

  if (isBalance) {
    return (
      <tr>
        <td>{denomination.type}</td>
        <td>{denomination.count}</td>
        <td>${parseInt((denomination.count * denomination.value).toString(), 10).toFixed(2)}</td>
      </tr>
    );
  } else {
    return (
      <div className="mb-4 col-md-4">
        <div className="card shadow denomination-card bg-dark">
          <div className="card-header text-center text-light">
            <h4>{denomination.type}</h4>
          </div>
          <div className="card-body p-0">
            <div>
              <img
                className="img-fluid"
                src={denominationiImageURL}
                alt="Denomination"
              />
            </div>
            <button
              className="btn left btn-success position-absolute"
              onClick={() => addDenomination()}
            >
              +
            </button>
            {denomination.count > 0 ? (
              <button
                className="btn right btn-danger position-absolute"
                onClick={() => subtractDenomination()}
              >
                -
              </button>
            ) : null}
          </div>
          <div className="card-footer text-light bg-dark clearfix">
            <span className={"badge badge-pill badge-secondary float-left "}>
              Count: {denomination.count}
            </span>
            <span
              className={`badge badge-pill float-right ${denomination.count > 0 ? "badge-secondary" : "badge-warning"
                }`}
            >
              Total: ${parseInt((denomination.count * denomination.value).toString(), 10).toFixed(2)}
            </span>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

}

export default Denomination;
