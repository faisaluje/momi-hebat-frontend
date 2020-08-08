import {
  OPEN_PASSWORD_DIALOG,
  CLOSE_PASSWORD_DIALOG,
  SET_PASSWORD_FORM,
  SAVE_PASSWORD,
  SAVE_PASSWORD_ERROR,
  SAVE_PASSWORD_SUCCESS
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
    case SET_PASSWORD_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_PASSWORD_DIALOG:
      return {
        ...state,
        props: {
          open: true
        }
      };
    case CLOSE_PASSWORD_DIALOG:
      return {
        ...initialState
      };
    case SAVE_PASSWORD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_PASSWORD_SUCCESS:
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
