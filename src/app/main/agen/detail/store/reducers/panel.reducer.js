const {
  EXIT_DETAIL_AGEN,
  SET_DETAIL_AGEN,
  SET_SALDO_AGEN,
  SET_SALDO_AGEN_ERROR,
  SET_SALDO_AGEN_SUCCESS
} = require('../actions');

const initialState = {
  agen: null,
  isLoading: false,
  isError: false,
  msg: '',
  saldo: 0
};

function panelReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DETAIL_AGEN:
      return {
        ...state,
        agen: action.agen
      };
    case SET_SALDO_AGEN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case SET_SALDO_AGEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case SET_SALDO_AGEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        saldo: action.payload
      };
    case EXIT_DETAIL_AGEN:
      return { ...initialState };
    default:
      return state;
  }
}

export default panelReducer;
