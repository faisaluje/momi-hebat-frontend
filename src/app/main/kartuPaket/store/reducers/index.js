import { combineReducers } from 'redux';
import table from './table.reducer';
import transaksi from './transaksi.reducer';

const reducer = combineReducers({
  table,
  transaksi
});

export default reducer;
