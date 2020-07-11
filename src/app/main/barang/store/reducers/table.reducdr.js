import {
  EXIT_LIST_BARANG,
  GET_LIST_BARANG,
  GET_LIST_BARANG_ERROR,
  GET_LIST_BARANG_SUCCESS,
  REFRESH_LIST_BARANG,
  SET_PERIODE_BARANG,
  SET_TXT_CARI_BARANG
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
    case REFRESH_LIST_BARANG:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_BARANG:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_BARANG_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_BARANG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_BARANG:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case SET_PERIODE_BARANG:
      return {
        ...state,
        periodeId: action.periodeId
      };
    case EXIT_LIST_BARANG:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
