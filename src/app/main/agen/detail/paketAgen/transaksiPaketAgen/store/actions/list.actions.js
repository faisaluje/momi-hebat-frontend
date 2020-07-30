import TransaksiPaketAgenService from '../../../services/transaksiPaketAgen.service';
import { refreshListPaketAgen } from '../../../store/actions';

export const OPEN_LIST_TRANSAKSI_PAKET_AGEN_DIALOG = 'OPEN_LIST_TRANSAKSI_PAKET_AGEN_DIALOG';
export const CLOSE_LIST_TRANSAKSI_PAKET_AGEN_DIALOG = 'CLOSE_LIST_TRANSAKSI_PAKET_AGEN_DIALOG';

export const GET_LIST_TRANSAKSI_PAKET_AGEN = 'GET_LIST_TRANSAKSI_PAKET_AGEN';
export const GET_LIST_TRANSAKSI_PAKET_AGEN_ERROR = 'GET_LIST_TRANSAKSI_PAKET_AGEN_ERROR';
export const GET_LIST_TRANSAKSI_PAKET_AGEN_SUCCESS = 'GET_LIST_TRANSAKSI_PAKET_AGEN_SUCCESS';

export const REFRESH_LIST_TRANSAKSI_PAKET_AGEN = 'REFRESH_LIST_TRANSAKSI_PAKET_AGEN';
export const EXIT_LIST_TRANSAKSI_PAKET_AGEN = 'EXIT_LIST_TRANSAKSI_PAKET_AGEN';

export const openListTransaksiPaketAgenDialog = () => ({ type: OPEN_LIST_TRANSAKSI_PAKET_AGEN_DIALOG });
export const closeListTransaksiPaketAgenDialog = () => ({ type: CLOSE_LIST_TRANSAKSI_PAKET_AGEN_DIALOG });

export const exitListTransaksiPaketAgen = () => ({ type: EXIT_LIST_TRANSAKSI_PAKET_AGEN });
export const refreshListTransaksiPaketAgen = () => ({ type: REFRESH_LIST_TRANSAKSI_PAKET_AGEN });

export function getListTransaksiPaketAgen(params) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_PAKET_AGEN });

    const listTransaksiPaketAgen = await TransaksiPaketAgenService.getListTransaksiPaketAgen(params);
    if (!listTransaksiPaketAgen.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_PAKET_AGEN_ERROR, payload: listTransaksiPaketAgen.msg });
    }

    return dispatch({ type: GET_LIST_TRANSAKSI_PAKET_AGEN_SUCCESS, payload: listTransaksiPaketAgen.data });
  };
}

export function deleteTransaksiPaketAgen(id) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_PAKET_AGEN });

    const result = await TransaksiPaketAgenService.deleteTransaksiPaketAgen(id);
    if (!result.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_PAKET_AGEN_ERROR, payload: result.msg });
    }

    dispatch(refreshListPaketAgen());
    return dispatch(refreshListTransaksiPaketAgen());
  };
}
