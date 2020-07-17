import {
  REFRESH_LIST_AGEN,
  GET_LIST_AGEN,
  GET_LIST_AGEN_ERROR,
  GET_LIST_AGEN_SUCCESS,
  SET_TXT_CARI_AGEN,
  EXIT_LIST_AGEN,
  SET_STATUS_AGEN,
  SET_LEVEL_AGEN,
  SET_LIST_AGEN_PAGE
} from '../actions';
import AgenStatus from '../../AgenStatus';

const initialState = {
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
  status: AgenStatus.aktif.value,
  level: '',
  page: 1
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LIST_AGEN:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_AGEN:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_AGEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_AGEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_LIST_AGEN_PAGE:
      return {
        ...state,
        page: action.page,
        isRefresh: true
      };
    case SET_TXT_CARI_AGEN:
      return {
        ...state,
        txtCari: action.txtCari,
        isRefresh: true,
        page: 1
      };
    case SET_STATUS_AGEN:
      return {
        ...state,
        status: action.status,
        isRefresh: true,
        page: 1
      };
    case SET_LEVEL_AGEN:
      return {
        ...state,
        level: action.level,
        isRefresh: true,
        page: 1
      };
    case EXIT_LIST_AGEN:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
