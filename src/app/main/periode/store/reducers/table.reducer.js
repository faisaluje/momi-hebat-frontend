import {
	REFRESH_LIST_PERIODE,
	GET_LIST_PERIODE,
	GET_LIST_PERIODE_ERROR,
	GET_LIST_PERIODE_SUCCESS,
	SET_TXT_CARI_PERIODE,
	EXIT_LIST_PERIODE
} from '../actions';

const initialState = {
	data: [],
	isLoading: false,
	isRefresh: true,
	isError: false,
	msg: '',
	txtCari: ''
};

function tableReducer(state = initialState, action) {
	switch (action.type) {
		case REFRESH_LIST_PERIODE:
			return {
				...state,
				isRefresh: true
			};
		case GET_LIST_PERIODE:
			return {
				...state,
				isLoading: true,
				isRefresh: false,
				isError: false,
				msg: ''
			};
		case GET_LIST_PERIODE_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				msg: action.payload
			};
		case GET_LIST_PERIODE_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload
			};
		case SET_TXT_CARI_PERIODE:
			return {
				...state,
				txtCari: action.txtCari
			};
		case EXIT_LIST_PERIODE:
			return { ...initialState };
		default:
			return state;
	}
}

export default tableReducer;
