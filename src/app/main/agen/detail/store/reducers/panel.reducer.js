const {
  EXIT_DETAIL_AGEN,
  SET_DETAIL_AGEN,
  GET_DETAIL_AGEN,
  GET_DETAIL_AGEN_ERROR,
  GET_DETAIL_AGEN_SUCCESS
} = require('../actions');

const initialState = {
  agen: null,
  isLoading: false,
  isError: false,
  msg: ''
};

function panelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAIL_AGEN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      };
    case GET_DETAIL_AGEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload
      };
    case GET_DETAIL_AGEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        agen: action.payload
      };
    case SET_DETAIL_AGEN:
      return {
        ...state,
        agen: action.agen
      };
    case EXIT_DETAIL_AGEN:
      return { ...initialState };
    default:
      return state;
  }
}

export default panelReducer;
