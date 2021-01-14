import { READY, CHAINS, AppActionTypes } from "../actions/app.actions";
import { chain } from "relay";

const commonConstants = {};

export type appState = {
  ready: -1 | 0 | 1;

  chains: {
    chains: chain[];
    sortedChains: chain[];
  };
};

const appStateReducer = (
  state: appState = {
    ready: 0,

    chains: {
      chains: [],
      sortedChains: [],
    },
  },
  action: AppActionTypes,
): appState => {
  switch (action.type) {
    case READY:
      return {
        ...state,
        ready: action.payload,
      };
    case CHAINS:
      return {
        ...state,
        chains: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export { appStateReducer, commonConstants };
