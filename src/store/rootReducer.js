import { combineReducers } from "redux";
import officeReducer from "./reducers/officeReducer";
import departmentReducer from "./reducers/departmentReducer";
import visitorReducer from "./reducers/visitorReducer";

const rootReducer = combineReducers({
  offices: officeReducer,
  departments: departmentReducer,
  visitors: visitorReducer,

});
export default rootReducer;
