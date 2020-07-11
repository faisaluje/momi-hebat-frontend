import BarangService from '../../services/barang.service';

export const GET_LIST_BARANG = 'GET_LIST_BARANG';
export const GET_LIST_BARANG_ERROR = 'GET_LIST_BARANG_ERROR';
export const GET_LIST_BARANG_SUCCESS = 'GET_LIST_BARANG_SUCCESS';

export const SET_TXT_CARI_BARANG = 'SET_TXT_CARI_BARANG';
export const SET_PERIODE_BARANG = 'SET_PERIODE_BARANG';
export const REFRESH_LIST_BARANG = 'REFRESH_LIST_BARANG';
export const EXIT_LIST_BARANG = 'EXIT_LIST_BARANG';

export const exitListBarang = () => ({ type: EXIT_LIST_BARANG });
export const refreshListBarang = () => ({ type: REFRESH_LIST_BARANG });
export const setTxtCariBarang = txtCari => ({ type: SET_TXT_CARI_BARANG, txtCari });
export const setPeriodeBarang = periodeId => ({ type: SET_PERIODE_BARANG, periodeId });

export function getListBarang(periodeId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_BARANG });

    const listBarang = await BarangService.getListBarang(periodeId);
    if (!listBarang.success) {
      return dispatch({ type: GET_LIST_BARANG_ERROR, payload: listBarang.msg });
    }

    return dispatch({ type: GET_LIST_BARANG_SUCCESS, payload: listBarang.data });
  };
}
