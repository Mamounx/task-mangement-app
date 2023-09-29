import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import taskReducer from './slice/task';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  task: taskReducer,
});

export { rootPersistConfig, rootReducer };