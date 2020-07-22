import {
  OPEN_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG,
  CLOSE_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG,
  SET_TRANSAKSI_KARTU_PAKET_AGEN_FORM,
  SAVE_TRANSAKSI_KARTU_PAKET_AGEN,
  SAVE_TRANSAKSI_KARTU_PAKET_AGEN_ERROR,
  SAVE_TRANSAKSI_KARTU_PAKET_AGEN_SUCCESS
} from '../actions';

const initialState = {
  data: null,
  jenis: 'masuk',
  props: {
    open: false
  },
  isLoading: false,
  isError: false,
  msg: ''
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSAKSI_KARTU_PAKET_AGEN_FORM:
      return {
        ...state,
        data: action.data
      };
    case OPEN_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG:
      return {
        ...state,
        props: {
          open: true
        },
        jenis: action.jenis
      };
    case CLOSE_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG:
      return {
        ...initialState
      };
    case SAVE_TRANSAKSI_KARTU_PAKET_AGEN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SAVE_TRANSAKSI_KARTU_PAKET_AGEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SAVE_TRANSAKSI_KARTU_PAKET_AGEN_SUCCESS:
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
