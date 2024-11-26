import { combineReducers } from "redux";
import officeReducer from "./reducers/officeReducer";
import departmentReducer from "./reducers/departmentReducer";
const rootReducer = combineReducers({
  offices: officeReducer,
  departments: departmentReducer,
});
export default rootReducer;
