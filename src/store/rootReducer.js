import { combineReducers } from 'redux';
import sortReducer from './Reducers/sortReducer';
import tableReducer from './Reducers/tableReducer';

const rootReducer = combineReducers({
    sort: sortReducer,
    table: tableReducer
});

export default rootReducer;