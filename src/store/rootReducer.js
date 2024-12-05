import { combineReducers } from 'redux';
import officeReducer from './reducers/officeReducer';
import departmentReducer from './reducers/departmentReducer';
import visitorReducer from './reducers/visitorReducer';
import pngReducer from './reducers/pngReducer';
import staffReducer from './reducers/staffReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  offices: officeReducer,
  departments: departmentReducer,
  visitors: visitorReducer,
  personas: pngReducer,
  staffs: staffReducer,
  auth: authReducer,
});
export default rootReducer;
