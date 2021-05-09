export interface Demonination {
  count: number;
  value: number;
  type: string;
  label: string;
}

export interface OperationResult {
  success: boolean;
  type: string;
  denominations: Demonination[];
}

export interface DenominationsProps {
  denominations: Demonination[];
  onDenominationsChange: (denominations: Demonination[]) => void;
}

export interface DenominationProps {
  denomination: Demonination;
  isBalanceSheet: boolean;
  onDenominationChange: (denomination: Demonination) => void;
}

export interface DenominationListProps {
  denominations: Demonination[];
  onDenominationChange: (denomination: Demonination) => void;
}

export interface AlertProps {
  success: boolean;
  messageText: string;
}

export interface TotalProps {
  total: number;
}

export interface OperationProps {
  denomination: Demonination;
}

export interface ShowMessageProps {
  operationResult: OperationResult[];
}
