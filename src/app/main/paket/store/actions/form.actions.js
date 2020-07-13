import PaketService from '../../services/paket.service';
import { refreshListPaket } from './table.actions';

export const OPEN_PAKET_DIALOG = 'OPEN_PAKET_DIALOG';
export const CLOSE_PAKET_DIALOG = 'CLOSE_PAKET_DIALOG';

export const SET_PAKET_FORM = 'SET_PAKET_FORM';

export const SAVE_PAKET = 'SAVE_PAKET';
export const SAVE_PAKET_ERROR = 'SAVE_PAKET_ERROR';
export const SAVE_PAKET_SUCCESS = 'SAVE_PAKET_SUCCESS';

export const setPaketForm = data => ({ type: SET_PAKET_FORM, data });
export const openPaketDialog = () => ({ type: OPEN_PAKET_DIALOG });
export const closePaketDialog = () => ({ type: CLOSE_PAKET_DIALOG });

export function savePaket(data) {
  return async dispatch => {
    dispatch({ type: SAVE_PAKET });

    let result = { success: false };
    if (!data.id) {
      result = await PaketService.createPaket(data);
    } else {
      const { id } = data;
      delete data.id;
      result = await PaketService.updatePaket(id, data);
    }

    if (!result.success) {
      return dispatch({ type: SAVE_PAKET_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_PAKET_SUCCESS, payload: result.data });
    dispatch(refreshListPaket());
    return dispatch(closePaketDialog());
  };
}
