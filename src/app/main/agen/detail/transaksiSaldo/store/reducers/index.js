import { combineReducers } from 'redux';
import table from './table.reducer';
import form from './form.reducer';

const reducer = combineReducers({
  table,
  form
});

export default reducer;
