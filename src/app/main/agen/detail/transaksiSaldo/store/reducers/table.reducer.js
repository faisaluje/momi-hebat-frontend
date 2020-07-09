import {
  REFRESH_LIST_TRANSAKSI_SALDO,
  GET_LIST_TRANSAKSI_SALDO,
  GET_LIST_TRANSAKSI_SALDO_ERROR,
  GET_LIST_TRANSAKSI_SALDO_SUCCESS,
  SET_TXT_CARI_TRANSAKSI_SALDO,
  EXIT_LIST_TRANSAKSI_SALDO
} from '../actions';

const initialState = {
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: ''
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LIST_TRANSAKSI_SALDO:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_TRANSAKSI_SALDO:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_TRANSAKSI_SALDO_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_TRANSAKSI_SALDO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_TRANSAKSI_SALDO:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case EXIT_LIST_TRANSAKSI_SALDO:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;