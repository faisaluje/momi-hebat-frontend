import {
  CLOSE_LIST_PILIHAN_PAKET_DIALOG,
  EXIT_LIST_PILIHAN_PAKET,
  GET_LIST_PILIHAN_PAKET,
  GET_LIST_PILIHAN_PAKET_ERROR,
  GET_LIST_PILIHAN_PAKET_SUCCESS,
  OPEN_LIST_PILIHAN_PAKET_DIALOG,
  REFRESH_LIST_PILIHAN_PAKET,
  SET_STATUS_PILIHAN_PAKET,
  SET_TXT_CARI_PILIHAN_PAKET
} from '../actions';

const initialState = {
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
  status: 'aktif',
  props: { open: false }
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_LIST_PILIHAN_PAKET_DIALOG:
      return {
        ...state,
        props: { open: true }
      };
    case CLOSE_LIST_PILIHAN_PAKET_DIALOG:
      return {
        ...state,
        props: { open: false }
      };
    case REFRESH_LIST_PILIHAN_PAKET:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_PILIHAN_PAKET:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_PILIHAN_PAKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_PILIHAN_PAKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_PILIHAN_PAKET:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case SET_STATUS_PILIHAN_PAKET:
      return {
        ...state,
        status: action.status,
        isRefresh: true
      };
    case EXIT_LIST_PILIHAN_PAKET:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
