import TransaksiPaketAgenService from '../../../services/transaksiPaketAgen.service';
import { refreshListPaketAgen } from '../../../store/actions';
import { refreshListTransaksiPaketAgen } from './list.actions';

export const OPEN_TRANSAKSI_PAKET_AGEN_DIALOG = 'OPEN_TRANSAKSI_PAKET_AGEN_DIALOG';
export const CLOSE_TRANSAKSI_PAKET_AGEN_DIALOG = 'CLOSE_TRANSAKSI_PAKET_AGEN_DIALOG';

export const SET_TRANSAKSI_PAKET_AGEN_FORM = 'SET_TRANSAKSI_PAKET_AGEN_FORM';

export const SAVE_TRANSAKSI_PAKET_AGEN = 'SAVE_TRANSAKSI_PAKET_AGEN';
export const SAVE_TRANSAKSI_PAKET_AGEN_ERROR = 'SAVE_TRANSAKSI_PAKET_AGEN_ERROR';
export const SAVE_TRANSAKSI_PAKET_AGEN_SUCCESS = 'SAVE_TRANSAKSI_PAKET_AGEN_SUCCESS';

export const setTransaksiPaketAgenForm = data => ({ type: SET_TRANSAKSI_PAKET_AGEN_FORM, data });
export const openTransaksiPaketAgenDialog = jenis => ({ type: OPEN_TRANSAKSI_PAKET_AGEN_DIALOG, jenis });
export const closeTransaksiPaketAgenDialog = () => ({ type: CLOSE_TRANSAKSI_PAKET_AGEN_DIALOG });

export function createTransaksiPaketAgen(data) {
  return async dispatch => {
    dispatch({ type: SAVE_TRANSAKSI_PAKET_AGEN });

    const result = await TransaksiPaketAgenService.createTransaksiPaketAgen(data);
    if (!result.success) {
      return dispatch({ type: SAVE_TRANSAKSI_PAKET_AGEN_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_TRANSAKSI_PAKET_AGEN_SUCCESS, payload: result.data });
    dispatch(refreshListTransaksiPaketAgen());
    dispatch(refreshListPaketAgen());
    return dispatch(closeTransaksiPaketAgenDialog());
  };
}
