import KaryawanService from 'app/main/packing/services/karyawan.service';

export const OPEN_LIST_KARYAWAN_DIALOG = 'OPEN_LIST_KARYAWAN_DIALOG';
export const CLOSE_LIST_KARYAWAN_DIALOG = 'CLOSE_LIST_KARYAWAN_DIALOG';

export const GET_LIST_KARYAWAN = 'GET_LIST_KARYAWAN';
export const GET_LIST_KARYAWAN_ERROR = 'GET_LIST_KARYAWAN_ERROR';
export const GET_LIST_KARYAWAN_SUCCESS = 'GET_LIST_KARYAWAN_SUCCESS';

export const SET_TXT_CARI_KARYAWAN = 'SET_TXT_CARI_KARYAWAN';
export const SET_STATUS_KARYAWAN = 'SET_STATUS_KARYAWAN';
export const REFRESH_LIST_KARYAWAN = 'REFRESH_LIST_KARYAWAN';
export const EXIT_LIST_KARYAWAN = 'EXIT_LIST_KARYAWAN';

export const openListKaryawanDialog = () => ({ type: OPEN_LIST_KARYAWAN_DIALOG });
export const closeListKaryawanDialog = () => ({ type: CLOSE_LIST_KARYAWAN_DIALOG });

export const exitListKaryawan = () => ({ type: EXIT_LIST_KARYAWAN });
export const refreshListKaryawan = () => ({ type: REFRESH_LIST_KARYAWAN });
export const setTxtCariKaryawan = txtCari => ({ type: SET_TXT_CARI_KARYAWAN, txtCari });
export const setStatusKaryawan = status => ({ type: SET_STATUS_KARYAWAN, status });

export function getListKaryawan(status) {
  return async dispatch => {
    dispatch({ type: GET_LIST_KARYAWAN });

    const listKaryawan = await KaryawanService.getListKaryawanData(status);
    if (!listKaryawan.success) {
      return dispatch({ type: GET_LIST_KARYAWAN_ERROR, payload: listKaryawan.msg });
    }

    return dispatch({ type: GET_LIST_KARYAWAN_SUCCESS, payload: listKaryawan.data });
  };
}
