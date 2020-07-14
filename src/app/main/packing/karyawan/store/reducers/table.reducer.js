import {
  CLOSE_LIST_KARYAWAN_DIALOG,
  EXIT_LIST_KARYAWAN,
  GET_LIST_KARYAWAN,
  GET_LIST_KARYAWAN_ERROR,
  GET_LIST_KARYAWAN_SUCCESS,
  OPEN_LIST_KARYAWAN_DIALOG,
  REFRESH_LIST_KARYAWAN,
  SET_STATUS_KARYAWAN,
  SET_TXT_CARI_KARYAWAN
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
  status: 'aktif'
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_LIST_KARYAWAN_DIALOG:
      return {
        ...state,
        props: { open: true }
      };
    case CLOSE_LIST_KARYAWAN_DIALOG:
      return {
        ...state,
        props: { open: false }
      };
    case REFRESH_LIST_KARYAWAN:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_KARYAWAN:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_KARYAWAN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_KARYAWAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_KARYAWAN:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case SET_STATUS_KARYAWAN:
      return {
        ...state,
        status: action.status,
        isRefresh: true
      };
    case EXIT_LIST_KARYAWAN:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
