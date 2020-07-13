import {
  EXIT_LIST_PAKET,
  GET_LIST_PAKET,
  GET_LIST_PAKET_ERROR,
  GET_LIST_PAKET_SUCCESS,
  REFRESH_LIST_PAKET,
  SET_PERIODE_PAKET,
  SET_STATUS_PAKET,
  SET_TXT_CARI_PAKET
} from '../actions';

const initialState = {
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
  periodeId: '',
  status: 'aktif'
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LIST_PAKET:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_PAKET:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_PAKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_PAKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_PAKET:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case SET_PERIODE_PAKET:
      return {
        ...state,
        periodeId: action.periodeId,
        isRefresh: true
      };
    case SET_STATUS_PAKET:
      return {
        ...state,
        status: action.status,
        isRefresh: true
      };
    case EXIT_LIST_PAKET:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
