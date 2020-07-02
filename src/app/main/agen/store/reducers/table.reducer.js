import {
	REFRESH_LIST_AGEN,
	GET_LIST_AGEN,
	GET_LIST_AGEN_ERROR,
	GET_LIST_AGEN_SUCCESS,
	SET_TXT_CARI_AGEN,
	EXIT_LIST_AGEN
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
		case REFRESH_LIST_AGEN:
			return {
				...state,
				isRefresh: true
			};
		case GET_LIST_AGEN:
			return {
				...state,
				isLoading: true,
				isRefresh: false,
				isError: false,
				msg: ''
			};
		case GET_LIST_AGEN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				msg: action.payload
			};
		case GET_LIST_AGEN_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload
			};
		case SET_TXT_CARI_AGEN:
			return {
				...state,
				txtCari: action.txtCari
			};
		case EXIT_LIST_AGEN:
			return { ...initialState };
		default:
			return state;
	}
}

export default tableReducer;
