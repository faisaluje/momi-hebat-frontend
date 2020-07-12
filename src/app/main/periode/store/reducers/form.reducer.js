import {
  SET_PERIODE_FORM,
  OPEN_PERIODE_DIALOG,
  CLOSE_PERIODE_DIALOG,
  SAVE_PERIODE_SUCCESS,
  SAVE_PERIODE,
  SAVE_PERIODE_ERROR
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
    case SET_PERIODE_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_PERIODE_DIALOG:
      return {
        ...state,
        props: {
          open: true
        }
      };
    case CLOSE_PERIODE_DIALOG:
      return {
        ...initialState
      };
    case SAVE_PERIODE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_PERIODE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_PERIODE_SUCCESS:
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
