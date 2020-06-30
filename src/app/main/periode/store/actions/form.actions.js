import PeriodeService from '../../services/periode.service';
import { refreshListPeriode } from './table.actions';

export const OPEN_PERIODE_DIALOG = 'OPEN_PERIODE_DIALOG';
export const CLOSE_PERIODE_DIALOG = 'CLOSE_PERIODE_DIALOG';

export const SET_PERIODE_FORM = 'SET_PERIODE_FORM';

export const SAVE_PERIODE = 'SAVE_PERIODE';
export const SAVE_PERIODE_ERROR = 'SAVE_PERIODE_ERROR';
export const SAVE_PERIODE_SUCCESS = 'SAVE_PERIODE_SUCCESS';

export const setPeriodeForm = data => ({ type: SET_PERIODE_FORM, data });
export const openPeriodeDialog = () => ({ type: OPEN_PERIODE_DIALOG });
export const closePeriodeDialog = () => ({ type: CLOSE_PERIODE_DIALOG });

export function savePeriode(data) {
	return async dispatch => {
		dispatch({ type: SAVE_PERIODE });

		let result = { success: false };
		if (!data.id) {
			result = await PeriodeService.createPeriode(data);
		} else {
			const { id } = data;
			delete data.id;
			result = await PeriodeService.updatePeriode(id, data);
		}

		if (!result.success) {
			return dispatch({ type: SAVE_PERIODE_ERROR, payload: result.msg });
		}

		dispatch({ type: SAVE_PERIODE_SUCCESS, payload: result.data });
		dispatch(refreshListPeriode());
		return dispatch(closePeriodeDialog());
	};
}
