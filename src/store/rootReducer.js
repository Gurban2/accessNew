import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import departmentReducer from './reducers/departmentReducer';
import officeReducer from './reducers/officeReducer';
import pngReducer from './reducers/pngReducer';
import staffReducer from './reducers/staffReducer';
import visitorReducer from './reducers/visitorReducer';

const rootReducer = combineReducers({
  offices: officeReducer,
  departments: departmentReducer,
  visitors: visitorReducer,
  personas: pngReducer,
  staffs: staffReducer,
  auth: authReducer,
});
export default rootReducer;
