export interface Denomination {
  count: number;
  value: number;
  type: string;
  label: string;
}

export interface OperationResult {
  success: boolean;
  type: string;
  denominations: Denomination[];
}

export interface DenominationsProps {
  denominations: Denomination[];
  onDenominationsChange: (denominations: Denomination[]) => void;
}

export interface DenominationProps {
  denomination: Denomination;
  isBalanceSheet: boolean;
  onDenominationChange: (denomination: Denomination) => void;
}

export interface DenominationListProps {
  denominations: Denomination[];
  onDenominationChange: (denomination: Denomination) => void;
}

export interface AlertProps {
  success: boolean;
  messageText: string;
}

export interface TotalProps {
  total: number;
}

export interface OperationProps {
  denomination: Denomination;
}

export interface ShowMessageProps {
  operationResult: OperationResult[];
}
