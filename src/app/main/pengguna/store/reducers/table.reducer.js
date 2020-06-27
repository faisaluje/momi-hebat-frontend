import {
	REFRESH_LIST_PENGGUNA,
	GET_LIST_PENGGUNA,
	GET_LIST_PENGGUNA_ERROR,
	GET_LIST_PENGGUNA_SUCCESS,
	SET_TXT_CARI_PENGGUNA,
	EXIT_LIST_PENGGUNA
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
		case REFRESH_LIST_PENGGUNA:
			return {
				...state,
				isRefresh: true
			};
		case GET_LIST_PENGGUNA:
			return {
				...state,
				isLoading: true,
				isRefresh: false,
				isError: false,
				msg: ''
			};
		case GET_LIST_PENGGUNA_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				msg: action.payload
			};
		case GET_LIST_PENGGUNA_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload
			};
		case SET_TXT_CARI_PENGGUNA:
			return {
				...state,
				txtCari: action.txtCari
			};
		case EXIT_LIST_PENGGUNA:
			return { ...initialState };
		default:
			return state;
	}
}

export default tableReducer;
