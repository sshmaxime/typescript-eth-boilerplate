import { IAppState } from "../reducers/index";
import { Dispatch } from "redux";
import { SDK } from "../../sdk";
import { chain } from "relay";

///////////
// READY //
///////////
export const READY = "READY";
export interface ActionInit {
  type: typeof READY;
  payload: -1 | 0 | 1; // -1 == error loading // 0 == loading // 1 == loaded
}

export const init = () => {
  const toDispatch = (payload: -1 | 0 | 1): ActionInit => {
    return {
      type: READY,
      payload: payload,
    };
  };

  return async (dispatch: any, getState: () => IAppState, sdk: SDK) => {
    try {
      await sdk.relayLib.ready;

      // Init first calls
      dispatch(fetchChains());
      //

      return dispatch(toDispatch(1));
    } catch {
      return dispatch(toDispatch(-1));
    }
  };
};

////////////
// CHAINS //
////////////
export const CHAINS = "CHAINS";
export interface ActionChains {
  type: typeof CHAINS;
  payload: {
    chains: chain[];
    sortedChains: chain[];
  };
}

export const fetchChains = () => {
  const toDispatch = (payload: {
    chains: chain[];
    sortedChains: chain[];
  }): ActionChains => {
    return {
      type: CHAINS,
      payload: payload,
    };
  };
  return async (dispatch: Dispatch, getState: () => IAppState, sdk: SDK) => {
    return dispatch(toDispatch(await sdk.relayLib.getAllChains()));
  };
};

export type AppActionTypes = ActionInit | ActionChains;
