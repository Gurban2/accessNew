import { combineReducers } from "redux";
import officeReducer from "./reducers/officeReducer";
import departmentReducer from "./reducers/departmentReducer";
import visitorReducer from "./reducers/visitorReducer";
import pngReducer from "./reducers/pngReducer";

const rootReducer = combineReducers({
  offices: officeReducer,
  departments: departmentReducer,
  visitors: visitorReducer,
  personas: pngReducer,
});
export default rootReducer;
