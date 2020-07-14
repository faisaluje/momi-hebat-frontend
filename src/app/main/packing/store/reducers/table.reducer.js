import {
  EXIT_LIST_PACKING,
  GET_LIST_PACKING,
  GET_LIST_PACKING_ERROR,
  GET_LIST_PACKING_SUCCESS,
  REFRESH_LIST_PACKING,
  SET_PERIODE_PACKING,
  SET_TXT_CARI_PACKING
} from '../actions';

const initialState = {
  data: {
    listPaket: [],
    listPacking: []
  },
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: '',
  txtCari: '',
  periodeId: ''
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LIST_PACKING:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_PACKING:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_PACKING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_PACKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SET_TXT_CARI_PACKING:
      return {
        ...state,
        txtCari: action.txtCari
      };
    case SET_PERIODE_PACKING:
      return {
        ...state,
        periodeId: action.periodeId,
        isRefresh: true
      };
    case EXIT_LIST_PACKING:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
