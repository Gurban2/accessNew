import { combineReducers } from "redux";
import officeReducer from "./reducers/officeReducer";
const rootReducer = combineReducers({
  offices: officeReducer,
});
export default rootReducer;
