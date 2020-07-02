import {
	SET_AGEN_FORM,
	OPEN_AGEN_DIALOG,
	CLOSE_AGEN_DIALOG,
	SAVE_AGEN_SUCCESS,
	SAVE_AGEN,
	SAVE_AGEN_ERROR
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
		case SET_AGEN_FORM:
			return {
				...state,
				data: action.data
			};
		case OPEN_AGEN_DIALOG:
			return {
				...state,
				props: {
					open: true
				}
			};
		case CLOSE_AGEN_DIALOG:
			return {
				...initialState
			};
		case SAVE_AGEN:
			return {
				...state,
				isLoading: true,
				isError: false,
				msg: ''
			};
		case SAVE_AGEN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				msg: action.payload
			};
		case SAVE_AGEN_SUCCESS:
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
