import {
  CLOSE_TRANSAKSI_PAKET_AGEN_DIALOG,
  OPEN_TRANSAKSI_PAKET_AGEN_DIALOG,
  SAVE_TRANSAKSI_PAKET_AGEN,
  SAVE_TRANSAKSI_PAKET_AGEN_ERROR,
  SAVE_TRANSAKSI_PAKET_AGEN_SUCCESS,
  SET_TRANSAKSI_PAKET_AGEN_FORM
} from '../actions';

const initialState = {
  data: null,
  jenis: 'pengambilan',
  props: {
    open: false
  },
  isLoading: false,
  isError: false,
  msg: ''
};

function formReduceer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSAKSI_PAKET_AGEN_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_TRANSAKSI_PAKET_AGEN_DIALOG:
      return {
        ...state,
        jenis: action.jenis,
        props: { open: true }
      };
    case CLOSE_TRANSAKSI_PAKET_AGEN_DIALOG:
      return {
        ...initialState
      };
    case SAVE_TRANSAKSI_PAKET_AGEN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_TRANSAKSI_PAKET_AGEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_TRANSAKSI_PAKET_AGEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: 'Berhasil menyimpan'
      };
    default:
      return state;
  }
}

export default formReduceer;
