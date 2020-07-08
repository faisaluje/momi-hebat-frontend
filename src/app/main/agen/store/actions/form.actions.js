import AgenService from '../../services/agen.service';
import { refreshListAgen } from './table.actions';

export const OPEN_AGEN_DIALOG = 'OPEN_AGEN_DIALOG';
export const CLOSE_AGEN_DIALOG = 'CLOSE_AGEN_DIALOG';

export const SET_AGEN_FORM = 'SET_AGEN_FORM';

export const SAVE_AGEN = 'SAVE_AGEN';
export const SAVE_AGEN_ERROR = 'SAVE_AGEN_ERROR';
export const SAVE_AGEN_SUCCESS = 'SAVE_AGEN_SUCCESS';

export const setAgenForm = data => ({ type: SET_AGEN_FORM, data });
export const openAgenDialog = jenisAgen => ({ type: OPEN_AGEN_DIALOG, jenisAgen });
export const closeAgenDialog = () => ({ type: CLOSE_AGEN_DIALOG });

export function saveAgen(data) {
  return async dispatch => {
    dispatch({ type: SAVE_AGEN });

    let result = { success: false };
    if (!data.id) {
      result = await AgenService.createAgen(data);
    } else {
      const { id } = data;
      delete data.id;
      result = await AgenService.updateAgen(id, data);
    }

    if (!result.success) {
      return dispatch({ type: SAVE_AGEN_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_AGEN_SUCCESS, payload: result.data });
    dispatch(refreshListAgen());
    return dispatch(closeAgenDialog());
  };
}
