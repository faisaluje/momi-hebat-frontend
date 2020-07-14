import PackingService from '../../services/packing.service';
import { refreshListPacking } from './table.actions';

export const OPEN_PACKING_DIALOG = 'OPEN_PACKING_DIALOG';
export const CLOSE_PACKING_DIALOG = 'CLOSE_PACKING_DIALOG';

export const SET_PACKING_FORM = 'SET_PACKING_FORM';

export const SAVE_PACKING = 'SAVE_PACKING';
export const SAVE_PACKING_ERROR = 'SAVE_PACKING_ERROR';
export const SAVE_PACKING_SUCCESS = 'SAVE_PACKING_SUCCESS';

export const setPackingForm = data => ({ type: SET_PACKING_FORM, data });
export const openPackingDialog = () => ({ type: OPEN_PACKING_DIALOG });
export const closePackingDialog = () => ({ type: CLOSE_PACKING_DIALOG });

export function savePacking(data) {
  return async dispatch => {
    dispatch({ type: SAVE_PACKING });

    const result = await PackingService.createPacking(data);

    if (!result.success) {
      return dispatch({ type: SAVE_PACKING_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_PACKING_SUCCESS, payload: result.data });
    dispatch(refreshListPacking());
    return dispatch(closePackingDialog());
  };
}
