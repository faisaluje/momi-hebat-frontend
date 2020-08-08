import { combineReducers } from 'redux';
import table from './table.reducer';
import form from './form.reducer';
import password from './password.reducer';

const reducer = combineReducers({
  table,
  form,
  password
});

export default reducer;
