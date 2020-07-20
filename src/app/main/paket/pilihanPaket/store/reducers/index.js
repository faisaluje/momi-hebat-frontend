import { combineReducers } from 'redux';
import list from './list.reducer';
import form from './form.reducer';

const reducer = combineReducers({
  list,
  form
});

export default reducer;
