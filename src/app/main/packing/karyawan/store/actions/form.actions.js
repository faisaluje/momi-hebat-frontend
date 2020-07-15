import KaryawanService from 'app/main/packing/services/karyawan.service';
import { refreshListKaryawan } from './table.actions';

export const OPEN_KARYAWAN_DIALOG = 'OPEN_KARYAWAN_DIALOG';
export const CLOSE_KARYAWAN_DIALOG = 'CLOSE_KARYAWAN_DIALOG';

export const SET_KARYAWAN_FORM = 'SET_KARYAWAN_FORM';

export const SAVE_KARYAWAN = 'SAVE_KARYAWAN';
export const SAVE_KARYAWAN_ERROR = 'SAVE_KARYAWAN_ERROR';
export const SAVE_KARYAWAN_SUCCESS = 'SAVE_KARYAWAN_SUCCESS';

export const setKaryawanForm = data => ({ type: SET_KARYAWAN_FORM, data });
export const openKaryawanDialog = () => ({ type: OPEN_KARYAWAN_DIALOG });
export const closeKaryawanDialog = () => ({ type: CLOSE_KARYAWAN_DIALOG });

export function saveKaryawan(data) {
  return async dispatch => {
    dispatch({ type: SAVE_KARYAWAN });

    let result = { success: false };
    if (!data.id) {
      result = await KaryawanService.createKaryawan(data);
    } else {
      const { id } = data;
      delete data.id;
      delete data.no;
      result = await KaryawanService.updateKaryawan(id, data);
    }

    if (!result.success) {
      return dispatch({ type: SAVE_KARYAWAN_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_KARYAWAN_SUCCESS, payload: result.data });
    dispatch(refreshListKaryawan());
    return dispatch(closeKaryawanDialog());
  };
}
