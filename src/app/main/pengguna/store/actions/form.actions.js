import PenggunaService from '../../services/pengguna.service';
import { refreshListPengguna } from './table.actions';

export const OPEN_PENGGUNA_DIALOG = 'OPEN_PENGGUNA_DIALOG';
export const CLOSE_PENGGUNA_DIALOG = 'CLOSE_PENGGUNA_DIALOG';

export const SET_PENGGUNA_FORM = 'SET_PENGGUNA_FORM';

export const SAVE_PENGGUNA = 'SAVE_PENGGUNA';
export const SAVE_PENGGUNA_ERROR = 'SAVE_PENGGUNA_ERROR';
export const SAVE_PENGGUNA_SUCCESS = 'SAVE_PENGGUNA_SUCCESS';

export const setPenggunaForm = data => ({ type: SET_PENGGUNA_FORM, data });
export const openPenggunaDialog = () => ({ type: OPEN_PENGGUNA_DIALOG });
export const closePenggunaDialog = () => ({ type: CLOSE_PENGGUNA_DIALOG });

export function savePengguna(data) {
	return async dispatch => {
		dispatch({ type: SAVE_PENGGUNA });

		let result = { success: false };
		if (!data.id) {
			result = await PenggunaService.createPengguna(data);
		} else {
			const { id } = data;
			delete data.id;
			result = await PenggunaService.updatePengguna(id, data);
		}

		if (!result.success) {
			return dispatch({ type: SAVE_PENGGUNA_ERROR, payload: result.msg });
		}

		dispatch({ type: SAVE_PENGGUNA_SUCCESS, payload: result.data });
		dispatch(refreshListPengguna());
		return dispatch(closePenggunaDialog());
	};
}
