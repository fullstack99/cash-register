import React from "react";
import AlertMessage from "./AlertMessage";
import { Demonination, ShowMessageProps, OperationResult } from "../types/global"

const ShowMessage = ({ operationResult }: ShowMessageProps) => {
  if (!operationResult.length) {
    return null;
  }

  const alertMessages = operationResult.map((result: OperationResult, index: number) => {
    let messageText = `${result.type} `;
    messageText += result.denominations
      .map((denomination: Demonination) => {
        return `${denomination?.count}x${denomination?.type}`;
      })
      .join(", ");

    return (
      <AlertMessage
        messageText={messageText}
        success={result.success}
        key={index}
      />
    );
  });

  return <div>{alertMessages}</div>;
};

export default ShowMessage;
