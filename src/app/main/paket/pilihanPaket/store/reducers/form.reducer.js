import {
  OPEN_PILIHAN_PAKET_DIALOG,
  CLOSE_PILIHAN_PAKET_DIALOG,
  SET_PILIHAN_PAKET_FORM,
  SAVE_PILIHAN_PAKET,
  SAVE_PILIHAN_PAKET_ERROR,
  SAVE_PILIHAN_PAKET_SUCCESS
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
    case SET_PILIHAN_PAKET_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_PILIHAN_PAKET_DIALOG:
      return {
        ...state,
        props: {
          open: true
        }
      };
    case CLOSE_PILIHAN_PAKET_DIALOG:
      return {
        ...initialState
      };
    case SAVE_PILIHAN_PAKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_PILIHAN_PAKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_PILIHAN_PAKET_SUCCESS:
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
