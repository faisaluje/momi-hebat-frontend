import {
  SET_PAKET_FORM,
  OPEN_PAKET_DIALOG,
  CLOSE_PAKET_DIALOG,
  SAVE_PAKET_SUCCESS,
  SAVE_PAKET,
  SAVE_PAKET_ERROR
} from '../actions';

const initialState = {
  data: null,
  props: {
    open: false
  },
  isLoading: false,
  isError: false,
  msg: ''
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAKET_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_PAKET_DIALOG:
      return {
        ...state,
        jenisPAKET: action.jenisPAKET,
        props: {
          open: true
        }
      };
    case CLOSE_PAKET_DIALOG:
      return {
        ...initialState
      };
    case SAVE_PAKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_PAKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_PAKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: 'Berhasil menyimpan'
      };
    default:
      return state;
  }
}

export default formReducer;
