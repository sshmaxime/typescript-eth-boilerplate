import { combineReducers, Reducer } from "redux";

import { appStateReducer, appState } from "./app.reducer";

export interface IAppState {
  appState: appState;
}

export const reducers: Reducer<IAppState> = combineReducers<IAppState>({
  appState: appStateReducer,
});
