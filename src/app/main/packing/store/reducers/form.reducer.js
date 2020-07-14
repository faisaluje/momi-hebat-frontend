import {
  OPEN_PACKING_DIALOG,
  CLOSE_PACKING_DIALOG,
  SET_PACKING_FORM,
  SAVE_PACKING,
  SAVE_PACKING_ERROR,
  SAVE_PACKING_SUCCESS
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
    case SET_PACKING_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_PACKING_DIALOG:
      return {
        ...state,
        props: {
          open: true
        }
      };
    case CLOSE_PACKING_DIALOG:
      return {
        ...initialState
      };
    case SAVE_PACKING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_PACKING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_PACKING_SUCCESS:
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
