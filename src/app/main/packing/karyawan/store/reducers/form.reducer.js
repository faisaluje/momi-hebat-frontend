import {
  OPEN_KARYAWAN_DIALOG,
  CLOSE_KARYAWAN_DIALOG,
  SET_KARYAWAN_FORM,
  SAVE_KARYAWAN,
  SAVE_KARYAWAN_ERROR,
  SAVE_KARYAWAN_SUCCESS
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
    case SET_KARYAWAN_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_KARYAWAN_DIALOG:
      return {
        ...state,
        props: {
          open: true
        }
      };
    case CLOSE_KARYAWAN_DIALOG:
      return {
        ...initialState
      };
    case SAVE_KARYAWAN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_KARYAWAN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_KARYAWAN_SUCCESS:
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
