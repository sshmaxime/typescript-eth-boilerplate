import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { SDK } from "../sdk";
import { reducers } from "./reducers/index";

export const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(new SDK())),
);
