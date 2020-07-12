import { combineReducers } from 'redux';
import table from './table.reducdr';
import transaksi from './transaksi.reducer';

const reducer = combineReducers({
  table,
  transaksi
});

export default reducer;
