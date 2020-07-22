import { combineReducers } from 'redux';
import table from './table.reducer';
import bonus from './bonus.reducer';

const reducer = combineReducers({
  table,
  bonus
});

export default reducer;
