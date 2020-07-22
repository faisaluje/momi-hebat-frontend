import TransaksiKartuPaketService from 'app/main/kartuPaket/services/transaksiKartuPaket.service';
import { refreshListKartuPaket, refreshListTransaksiKartuPaket } from 'app/main/kartuPaket/store/actions';
import { refreshListKartuPaketAgen } from './table.actions';

export const OPEN_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG = 'OPEN_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG';
export const CLOSE_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG = 'CLOSE_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG';

export const SET_TRANSAKSI_KARTU_PAKET_AGEN_FORM = 'SET_TRANSAKSI_KARTU_PAKET_AGEN_FORM';

export const SAVE_TRANSAKSI_KARTU_PAKET_AGEN = 'SAVE_TRANSAKSI_KARTU_PAKET_AGEN';
export const SAVE_TRANSAKSI_KARTU_PAKET_AGEN_ERROR = 'SAVE_TRANSAKSI_KARTU_PAKET_AGEN_ERROR';
export const SAVE_TRANSAKSI_KARTU_PAKET_AGEN_SUCCESS = 'SAVE_TRANSAKSI_KARTU_PAKET_AGEN_SUCCESS';

export const setTransaksiKartuPaketAgenForm = data => ({ type: SET_TRANSAKSI_KARTU_PAKET_AGEN_FORM, data });
export const openTransaksiKartuPaketAgenDialog = jenis => ({ type: OPEN_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG, jenis });
export const closeTransaksiKartuPaketAgenDialog = () => ({ type: CLOSE_TRANSAKSI_KARTU_PAKET_AGEN_DIALOG });

export function createTransaksiKartuPaketAgen(data) {
  return async dispatch => {
    dispatch({ type: SAVE_TRANSAKSI_KARTU_PAKET_AGEN });

    const result = await TransaksiKartuPaketService.createTransaksiKartuPaket(data);
    if (!result.success) {
      return dispatch({ type: SAVE_TRANSAKSI_KARTU_PAKET_AGEN_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_TRANSAKSI_KARTU_PAKET_AGEN_SUCCESS, payload: result.data });
    dispatch(refreshListTransaksiKartuPaket());
    dispatch(refreshListKartuPaket());
    dispatch(refreshListKartuPaketAgen());
    return dispatch(closeTransaksiKartuPaketAgenDialog());
  };
}
