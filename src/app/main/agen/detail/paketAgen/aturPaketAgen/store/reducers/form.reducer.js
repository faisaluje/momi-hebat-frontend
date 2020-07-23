import {
  OPEN_ATUR_PAKET_AGEN_DIALOG,
  CLOSE_ATUR_PAKET_AGEN_DIALOG,
  SET_ATUR_PAKET_AGEN_FORM,
  SAVE_ATUR_PAKET_AGEN,
  SAVE_ATUR_PAKET_AGEN_ERROR,
  SAVE_ATUR_PAKET_AGEN_SUCCESS
} from '../actions';

const initialState = {
  data: null,
  jenis: 'booking',
  props: {
    open: false
  },
  isLoading: false,
  isError: false,
  msg: ''
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ATUR_PAKET_AGEN_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_ATUR_PAKET_AGEN_DIALOG:
      return {
        ...state,
        props: {
          open: true
        },
        jenis: action.jenis
      };
    case CLOSE_ATUR_PAKET_AGEN_DIALOG:
      return {
        ...initialState
      };
    case SAVE_ATUR_PAKET_AGEN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_ATUR_PAKET_AGEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_ATUR_PAKET_AGEN_SUCCESS:
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
