import TransaksiBarangService from '../../services/transaksiBarang.service';
import { refreshListBarang } from './table.actions';

export const OPEN_LIST_TRANSAKSI_BARANG_DIALOG = 'OPEN_LIST_TRANSAKSI_BARANG_DIALOG';
export const CLOSE_LIST_TRANSAKSI_BARANG_DIALOG = 'CLOSE_LIST_TRANSAKSI_BARANG_DIALOG';

export const GET_LIST_TRANSAKSI_BARANG = 'GET_LIST_TRANSAKSI_BARANG';
export const GET_LIST_TRANSAKSI_BARANG_ERROR = 'GET_LIST_TRANSAKSI_BARANG_ERROR';
export const GET_LIST_TRANSAKSI_BARANG_SUCCESS = 'GET_LIST_TRANSAKSI_BARANG_SUCCESS';

export const SET_TXT_CARI_TRANSAKSI_BARANG = 'SET_TXT_CARI_TRANSAKSI_BARANG';
export const SET_PERIODE_TRANSAKSI_BARANG = 'SET_PERIODE_TRANSAKSI_BARANG';
export const REFRESH_LIST_TRANSAKSI_BARANG = 'REFRESH_LIST_TRANSAKSI_BARANG';
export const EXIT_LIST_TRANSAKSI_BARANG = 'EXIT_LIST_TRANSAKSI_BARANG';

export const OPEN_TRANSAKSI_BARANG_DIALOG = 'OPEN_TRANSAKSI_BARANG_DIALOG';
export const CLOSE_TRANSAKSI_BARANG_DIALOG = 'CLOSE_TRANSAKSI_BARANG_DIALOG';

export const SET_TRANSAKSI_BARANG_FORM = 'SET_TRANSAKSI_BARANG_FORM';

export const SAVE_TRANSAKSI_BARANG = 'SAVE_TRANSAKSI_BARANG';
export const SAVE_TRANSAKSI_BARANG_ERROR = 'SAVE_TRANSAKSI_BARANG_ERROR';
export const SAVE_TRANSAKSI_BARANG_SUCCESS = 'SAVE_TRANSAKSI_BARANG_SUCCESS';

export const openListTransaksiBarangDialog = () => ({ type: OPEN_LIST_TRANSAKSI_BARANG_DIALOG });
export const closeListTransaksiBarangDialog = () => ({ type: CLOSE_LIST_TRANSAKSI_BARANG_DIALOG });

export const exitListTransaksiBarang = () => ({ type: EXIT_LIST_TRANSAKSI_BARANG });
export const refreshListTransaksiBarang = () => ({ type: REFRESH_LIST_TRANSAKSI_BARANG });
export const setTxtCariTransaksiBarang = txtCari => ({ type: SET_TXT_CARI_TRANSAKSI_BARANG, txtCari });
export const setPeriodeTransaksiBarang = periodeId => ({ type: SET_PERIODE_TRANSAKSI_BARANG, periodeId });

export function getListTransaksiBarang(periodeId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_BARANG });

    const listTransaksiBarang = await TransaksiBarangService.getListTransaksiBarang(periodeId);
    if (!listTransaksiBarang.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_BARANG_ERROR, payload: listTransaksiBarang.msg });
    }

    return dispatch({ type: GET_LIST_TRANSAKSI_BARANG_SUCCESS, payload: listTransaksiBarang.data });
  };
}

export function deleteTransaksiBarang(id) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_BARANG });

    const result = await TransaksiBarangService.deleteTransaksiBarang(id);
    if (!result.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_BARANG_ERROR, payload: result.msg });
    }

    dispatch(refreshListBarang());
    return dispatch(refreshListTransaksiBarang());
  };
}

export const setTransaksiBarangForm = data => ({ type: SET_TRANSAKSI_BARANG_FORM, data });
export const openTransaksiBarangDialog = () => ({ type: OPEN_TRANSAKSI_BARANG_DIALOG });
export const closeTransaksiBarangDialog = () => ({ type: CLOSE_TRANSAKSI_BARANG_DIALOG });

export function createTransaksiBarang(data) {
  return async dispatch => {
    dispatch({ type: SAVE_TRANSAKSI_BARANG });

    const result = await TransaksiBarangService.createTransaksiBarang(data);
    if (!result.success) {
      return dispatch({ type: SAVE_TRANSAKSI_BARANG_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_TRANSAKSI_BARANG_SUCCESS, payload: result.data });
    dispatch(refreshListTransaksiBarang());
    return dispatch(closeTransaksiBarangDialog());
  };
}
