import {
  CLOSE_LIST_TRANSAKSI_BARANG_DIALOG,
  CLOSE_TRANSAKSI_BARANG_DIALOG,
  EXIT_LIST_TRANSAKSI_BARANG,
  GET_LIST_TRANSAKSI_BARANG,
  GET_LIST_TRANSAKSI_BARANG_ERROR,
  GET_LIST_TRANSAKSI_BARANG_SUCCESS,
  OPEN_LIST_TRANSAKSI_BARANG_DIALOG,
  OPEN_TRANSAKSI_BARANG_DIALOG,
  REFRESH_LIST_TRANSAKSI_BARANG,
  SAVE_TRANSAKSI_BARANG,
  SAVE_TRANSAKSI_BARANG_ERROR,
  SAVE_TRANSAKSI_BARANG_SUCCESS,
  SET_TRANSAKSI_BARANG_FORM,
  SET_TXT_CARI_TRANSAKSI_BARANG
} from '../actions';

const initialState = {
  props: {
    open: false
  },
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
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

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_LIST_TRANSAKSI_BARANG_DIALOG:
      return {
        ...state,
        props: { open: true }
      };
    case CLOSE_LIST_TRANSAKSI_BARANG_DIALOG:
      return {
        ...state,
        props: { open: false }
      };
    case REFRESH_LIST_TRANSAKSI_BARANG:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_TRANSAKSI_BARANG:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_TRANSAKSI_BARANG_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_TRANSAKSI_BARANG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_TRANSAKSI_BARANG:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case EXIT_LIST_TRANSAKSI_BARANG:
      return { ...initialState };
    case SET_TRANSAKSI_BARANG_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          data: action.data
        }
      };
    case OPEN_TRANSAKSI_BARANG_DIALOG:
      return {
        ...state,
        form: {
          ...state.form,
          props: { open: true }
        }
      };
    case CLOSE_TRANSAKSI_BARANG_DIALOG:
      return {
        ...state,
        form: {
          ...initialState.form
        }
      };
    case SAVE_TRANSAKSI_BARANG:
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: true,
          isError: false,
          msg: ''
        }
      };
    case SAVE_TRANSAKSI_BARANG_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: false,
          isError: true,
          msg: action.payload
        }
      };
    case SAVE_TRANSAKSI_BARANG_SUCCESS:
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

export default tableReducer;
