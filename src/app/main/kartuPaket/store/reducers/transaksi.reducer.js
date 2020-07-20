import {
  CLOSE_LIST_TRANSAKSI_KARTU_PAKET_DIALOG,
  CLOSE_TRANSAKSI_KARTU_PAKET_DIALOG,
  EXIT_LIST_TRANSAKSI_KARTU_PAKET,
  GET_LIST_TRANSAKSI_KARTU_PAKET,
  GET_LIST_TRANSAKSI_KARTU_PAKET_ERROR,
  GET_LIST_TRANSAKSI_KARTU_PAKET_SUCCESS,
  OPEN_LIST_TRANSAKSI_KARTU_PAKET_DIALOG,
  OPEN_TRANSAKSI_KARTU_PAKET_DIALOG,
  REFRESH_LIST_TRANSAKSI_KARTU_PAKET,
  SAVE_TRANSAKSI_KARTU_PAKET,
  SAVE_TRANSAKSI_KARTU_PAKET_ERROR,
  SAVE_TRANSAKSI_KARTU_PAKET_SUCCESS,
  SET_LIST_TRANSAKSI_KARTU_PAKET_PAGE,
  SET_TRANSAKSI_KARTU_PAKET_FORM,
  SET_TXT_CARI_TRANSAKSI_KARTU_PAKET
} from '../actions';

const initialState = {
  props: {
    open: false
  },
  data: null,
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
  page: 1,
  form: {
    data: null,
    props: {
      open: false
    },
    isLoading: false,
    isError: false,
    msg: ''
  }
};

function transaksiReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_LIST_TRANSAKSI_KARTU_PAKET_DIALOG:
      return {
        ...state,
        props: { open: true }
      };
    case CLOSE_LIST_TRANSAKSI_KARTU_PAKET_DIALOG:
      return {
        ...state,
        props: { open: false }
      };
    case REFRESH_LIST_TRANSAKSI_KARTU_PAKET:
      return {
        ...state,
        isRefresh: true
      };
    case SET_LIST_TRANSAKSI_KARTU_PAKET_PAGE:
      return {
        ...state,
        page: action.page,
        isRefresh: true
      };
    case GET_LIST_TRANSAKSI_KARTU_PAKET:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_TRANSAKSI_KARTU_PAKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_TRANSAKSI_KARTU_PAKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_TRANSAKSI_KARTU_PAKET:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case EXIT_LIST_TRANSAKSI_KARTU_PAKET:
      return { ...initialState };
    case SET_TRANSAKSI_KARTU_PAKET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          data: action.data
        }
      };
    case OPEN_TRANSAKSI_KARTU_PAKET_DIALOG:
      return {
        ...state,
        form: {
          ...state.form,
          props: { open: true }
        }
      };
    case CLOSE_TRANSAKSI_KARTU_PAKET_DIALOG:
      return {
        ...state,
        form: {
          ...initialState.form
        }
      };
    case SAVE_TRANSAKSI_KARTU_PAKET:
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: true,
          isError: false,
          msg: ''
        }
      };
    case SAVE_TRANSAKSI_KARTU_PAKET_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: false,
          isError: true,
          msg: action.payload
        }
      };
    case SAVE_TRANSAKSI_KARTU_PAKET_SUCCESS:
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: false,
          msg: 'Berhasil menyimpan'
        }
      };
    default:
      return state;
  }
}

export default transaksiReducer;
