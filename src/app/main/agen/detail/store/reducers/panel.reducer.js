const { EXIT_DETAIL_AGEN, SET_DETAIL_AGEN } = require('../actions');

const initialState = {
  agen: null
};

function panelReducer(state = initialState, action) {
  switch (action.type) {
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
