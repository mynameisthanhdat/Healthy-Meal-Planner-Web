import { combineReducers } from "redux";
import {homeReducer} from './homeReducer';
import {foodReducer} from "./foodReducer";

export const RootReducer = combineReducers({
  homeReducer,
  foodReducer
});