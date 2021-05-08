import { handleActions } from "redux-actions";
import { cashAuctions } from "../actions";

const defaultState = {
  user: null,
  isAuthenticated: false,
};

const cashReducer = handleActions(
  {
    [(cashAuctions.calculateTotal as unknown) as string]: (
      state: any,
      { payload }: any
    ) => {
      return { ...state, user: payload, isAuthenticated: true };
    },
  },
  defaultState
);

export default cashReducer;
