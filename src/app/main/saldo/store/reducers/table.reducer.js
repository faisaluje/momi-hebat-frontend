import {
  EXIT_LIST_SALDO,
  GET_LIST_SALDO,
  GET_LIST_SALDO_ERROR,
  GET_LIST_SALDO_SUCCESS,
  REFRESH_LIST_SALDO,
  SET_LIST_SALDO_PAGE,
  SET_PERIODE_SALDO,
  SET_TXT_CARI_SALDO
} from '../actions';

const initialState = {
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
  periodeId: '',
  page: 1
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LIST_SALDO:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_SALDO:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_SALDO_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_SALDO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_LIST_SALDO_PAGE:
      return {
        ...state,
        page: action.page,
        isRefresh: true
      };
    case SET_TXT_CARI_SALDO:
      return {
        ...state,
        txtCari: action.txtCari,
        isRefresh: true,
        page: 1
      };
    case SET_PERIODE_SALDO:
      return {
        ...state,
        periodeId: action.periodeId,
        isRefresh: true,
        page: 1
      };
    case EXIT_LIST_SALDO:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
