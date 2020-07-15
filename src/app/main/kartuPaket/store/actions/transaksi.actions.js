import TransaksiKartuPaketService from '../../services/transaksiKartuPaket.service';
import { refreshListKartuPaket } from './table.actions';

export const OPEN_LIST_TRANSAKSI_KARTU_PAKET_DIALOG = 'OPEN_LIST_TRANSAKSI_KARTU_PAKET_DIALOG';
export const CLOSE_LIST_TRANSAKSI_KARTU_PAKET_DIALOG = 'CLOSE_LIST_TRANSAKSI_KARTU_PAKET_DIALOG';

export const GET_LIST_TRANSAKSI_KARTU_PAKET = 'GET_LIST_TRANSAKSI_KARTU_PAKET';
export const GET_LIST_TRANSAKSI_KARTU_PAKET_ERROR = 'GET_LIST_TRANSAKSI_KARTU_PAKET_ERROR';
export const GET_LIST_TRANSAKSI_KARTU_PAKET_SUCCESS = 'GET_LIST_TRANSAKSI_KARTU_PAKET_SUCCESS';

export const SET_TXT_CARI_TRANSAKSI_KARTU_PAKET = 'SET_TXT_CARI_TRANSAKSI_KARTU_PAKET';
export const SET_PERIODE_TRANSAKSI_KARTU_PAKET = 'SET_PERIODE_TRANSAKSI_KARTU_PAKET';
export const REFRESH_LIST_TRANSAKSI_KARTU_PAKET = 'REFRESH_LIST_TRANSAKSI_KARTU_PAKET';
export const EXIT_LIST_TRANSAKSI_KARTU_PAKET = 'EXIT_LIST_TRANSAKSI_KARTU_PAKET';

export const OPEN_TRANSAKSI_KARTU_PAKET_DIALOG = 'OPEN_TRANSAKSI_KARTU_PAKET_DIALOG';
export const CLOSE_TRANSAKSI_KARTU_PAKET_DIALOG = 'CLOSE_TRANSAKSI_KARTU_PAKET_DIALOG';

export const SET_TRANSAKSI_KARTU_PAKET_FORM = 'SET_TRANSAKSI_KARTU_PAKET_FORM';

export const SAVE_TRANSAKSI_KARTU_PAKET = 'SAVE_TRANSAKSI_KARTU_PAKET';
export const SAVE_TRANSAKSI_KARTU_PAKET_ERROR = 'SAVE_TRANSAKSI_KARTU_PAKET_ERROR';
export const SAVE_TRANSAKSI_KARTU_PAKET_SUCCESS = 'SAVE_TRANSAKSI_KARTU_PAKET_SUCCESS';

export const openListTransaksiKartuPaketDialog = () => ({ type: OPEN_LIST_TRANSAKSI_KARTU_PAKET_DIALOG });
export const closeListTransaksiKartuPaketDialog = () => ({ type: CLOSE_LIST_TRANSAKSI_KARTU_PAKET_DIALOG });

export const exitListTransaksiKartuPaket = () => ({ type: EXIT_LIST_TRANSAKSI_KARTU_PAKET });
export const refreshListTransaksiKartuPaket = () => ({ type: REFRESH_LIST_TRANSAKSI_KARTU_PAKET });
export const setTxtCariTransaksiKartuPaket = txtCari => ({ type: SET_TXT_CARI_TRANSAKSI_KARTU_PAKET, txtCari });
export const setPeriodeTransaksiKartuPaket = periodeId => ({ type: SET_PERIODE_TRANSAKSI_KARTU_PAKET, periodeId });

export function getListTransaksiKartuPaket(periodeId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_KARTU_PAKET });

    const listTransaksiKartuPaket = await TransaksiKartuPaketService.getListTransaksiKartuPaketData(periodeId);
    if (!listTransaksiKartuPaket.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_KARTU_PAKET_ERROR, payload: listTransaksiKartuPaket.msg });
    }

    return dispatch({ type: GET_LIST_TRANSAKSI_KARTU_PAKET_SUCCESS, payload: listTransaksiKartuPaket.data });
  };
}

export function deleteTransaksiKartuPaket(id) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_KARTU_PAKET });

    const result = await TransaksiKartuPaketService.deleteTransaksiKartuPaket(id);
    if (!result.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_KARTU_PAKET_ERROR, payload: result.msg });
    }

    dispatch(refreshListKartuPaket());
    return dispatch(refreshListTransaksiKartuPaket());
  };
}

export const setTransaksiKartuPaketForm = data => ({ type: SET_TRANSAKSI_KARTU_PAKET_FORM, data });
export const openTransaksiKartuPaketDialog = () => ({ type: OPEN_TRANSAKSI_KARTU_PAKET_DIALOG });
export const closeTransaksiKartuPaketDialog = () => ({ type: CLOSE_TRANSAKSI_KARTU_PAKET_DIALOG });

export function createTransaksiKartuPaket(data) {
  return async dispatch => {
    dispatch({ type: SAVE_TRANSAKSI_KARTU_PAKET });

    const result = await TransaksiKartuPaketService.createTransaksiKartuPaket(data);
    if (!result.success) {
      return dispatch({ type: SAVE_TRANSAKSI_KARTU_PAKET_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_TRANSAKSI_KARTU_PAKET_SUCCESS, payload: result.data });
    dispatch(refreshListTransaksiKartuPaket());
    dispatch(refreshListKartuPaket());
    return dispatch(closeTransaksiKartuPaketDialog());
  };
}
