import { combineReducers } from 'redux';
import table from './table.reducer';
import transaksi from './transaksi.reducer';
import form from './form.reducer';

const reducer = combineReducers({
  table,
  transaksi,
  form
});

export default reducer;
