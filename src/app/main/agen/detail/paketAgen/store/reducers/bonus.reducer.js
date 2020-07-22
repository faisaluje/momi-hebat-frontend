import {
  OPEN_BONUS_PAKET_DIALOG,
  CLOSE_BONUS_PAKET_DIALOG,
  SAVE_BONUS_PAKET_SUCCESS,
  SAVE_BONUS_PAKET,
  SAVE_BONUS_PAKET_ERROR
} from '../actions';

const initialState = {
  props: {
    open: false
  },
  isLoading: false,
  isError: false,
  msg: ''
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_BONUS_PAKET_DIALOG:
      return {
        ...state,
        props: {
          open: true
        }
      };
    case CLOSE_BONUS_PAKET_DIALOG:
      return {
        ...initialState
      };
    case SAVE_BONUS_PAKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_BONUS_PAKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_BONUS_PAKET_SUCCESS:
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
