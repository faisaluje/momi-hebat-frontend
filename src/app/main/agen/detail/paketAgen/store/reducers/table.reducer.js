import {
  REFRESH_LIST_PAKET_AGEN,
  GET_LIST_PAKET_AGEN,
  GET_LIST_PAKET_AGEN_ERROR,
  GET_LIST_PAKET_AGEN_SUCCESS,
  EXIT_LIST_PAKET_AGEN
} from '../actions';

const initialState = {
  data: [],
  isLoading: false,
  isRefresh: true,
  isError: false,
  msg: ''
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LIST_PAKET_AGEN:
      return {
        ...state,
        isRefresh: true
      };
    case GET_LIST_PAKET_AGEN:
      return {
        ...state,
        isLoading: true,
        isRefresh: false,
        isError: false,
        msg: ''
      };
    case GET_LIST_PAKET_AGEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_LIST_PAKET_AGEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case EXIT_LIST_PAKET_AGEN:
      return { ...initialState };
    default:
      return state;
  }
}

export default tableReducer;
