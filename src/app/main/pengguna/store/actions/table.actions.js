import PenggunaService from '../../services/pengguna.service';

export const GET_LIST_PENGGUNA = 'GET_LIST_PENGGUNA';
export const GET_LIST_PENGGUNA_ERROR = 'GET_LIST_PENGGUNA_ERROR';
export const GET_LIST_PENGGUNA_SUCCESS = 'GET_LIST_PENGGUNA_SUCCESS';

export const SET_TXT_CARI_PENGGUNA = 'SET_TXT_CARI_PENGGUNA';
export const REFRESH_LIST_PENGGUNA = 'REFRESH_LIST_PENGGUNA';
export const EXIT_LIST_PENGGUNA = 'EXIT_LIST_PENGGUNA';

export const exitListPengguna = () => ({ type: EXIT_LIST_PENGGUNA });
export const refreshListPengguna = () => ({ type: REFRESH_LIST_PENGGUNA });
export const setTxtCariPengguna = txtCari => ({ type: SET_TXT_CARI_PENGGUNA, txtCari });

export function getListPengguna() {
  return async dispatch => {
    dispatch({ type: GET_LIST_PENGGUNA });

    const listPengguna = await PenggunaService.getListPenggunaData();
    if (!listPengguna.success) {
      return dispatch({ type: GET_LIST_PENGGUNA_ERROR, payload: listPengguna.msg });
    }

    return dispatch({ type: GET_LIST_PENGGUNA_SUCCESS, payload: listPengguna.data });
  };
}
