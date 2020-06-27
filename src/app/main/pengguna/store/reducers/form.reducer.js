import {
	OPEN_PENGGUNA_DIALOG,
	CLOSE_PENGGUNA_DIALOG,
	SET_PENGGUNA_FORM,
	SAVE_PENGGUNA,
	SAVE_PENGGUNA_ERROR,
	SAVE_PENGGUNA_SUCCESS
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
		case SET_PENGGUNA_FORM:
			return {
				...state,
				data: action.data
			};
		case OPEN_PENGGUNA_DIALOG:
			return {
				...state,
				props: {
					open: true
				}
			};
		case CLOSE_PENGGUNA_DIALOG:
			return {
				...initialState
			};
		case SAVE_PENGGUNA:
			return {
				...state,
				isLoading: true,
				isError: false,
				msg: ''
			};
		case SAVE_PENGGUNA_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				msg: action.payload
			};
		case SAVE_PENGGUNA_SUCCESS:
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
