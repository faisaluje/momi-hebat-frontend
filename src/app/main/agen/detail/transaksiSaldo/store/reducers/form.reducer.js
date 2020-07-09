import {
  SET_TRANSAKSI_SALDO_FORM,
  OPEN_TRANSAKSI_SALDO_DIALOG,
  CLOSE_TRANSAKSI_SALDO_DIALOG,
  SAVE_TRANSAKSI_SALDO,
  SAVE_TRANSAKSI_SALDO_ERROR,
  SAVE_TRANSAKSI_SALDO_SUCCESS
} from '../actions';
import TransaksiSaldoKategori from '../../TransaksiSaldoKategori';

const initialState = {
  data: null,
  props: {
    open: false
  },
  kategori: TransaksiSaldoKategori.SETORAN,
  isLoading: false,
  isError: false,
  msg: ''
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSAKSI_SALDO_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_TRANSAKSI_SALDO_DIALOG:
      return {
        ...state,
        kategori: action.kategori,
        props: {
          open: true
        }
      };
    case CLOSE_TRANSAKSI_SALDO_DIALOG:
      return {
        ...initialState
      };
    case SAVE_TRANSAKSI_SALDO:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_TRANSAKSI_SALDO_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_TRANSAKSI_SALDO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: 'Berhasil menyimpan'
      };
    default:
      return state;
  }
}

export default formReducer;
