import {
  EXIT_LIST_KARTU_PAKET,
  GET_LIST_KARTU_PAKET,
  GET_LIST_KARTU_PAKET_ERROR,
  GET_LIST_KARTU_PAKET_SUCCESS,
  REFRESH_LIST_KARTU_PAKET,
  SET_PERIODE_KARTU_PAKET,
  SET_TXT_CARI_KARTU_PAKET
} from '../actions';

const initialState = {
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
  periodeId: ''
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LIST_KARTU_PAKET:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_KARTU_PAKET:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_KARTU_PAKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_KARTU_PAKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_KARTU_PAKET:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case SET_PERIODE_KARTU_PAKET:
      return {
        ...state,
        periodeId: action.periodeId,
        isRefresh: true
      };
    case EXIT_LIST_KARTU_PAKET:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
