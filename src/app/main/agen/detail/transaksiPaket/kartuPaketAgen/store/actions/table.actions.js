import KartuPaketService from 'app/main/kartuPaket/services/kartuPaket.service';
import TransaksiKartuPaketService from 'app/main/kartuPaket/services/transaksiKartuPaket.service';
import { refreshListKartuPaket, refreshListTransaksiKartuPaket } from 'app/main/kartuPaket/store/actions';

export const OPEN_LIST_KARTU_PAKET_AGEN_DIALOG = 'OPEN_LIST_KARTU_PAKET_AGEN_DIALOG';
export const CLOSE_LIST_KARTU_PAKET_AGEN_DIALOG = 'CLOSE_LIST_KARTU_PAKET_AGEN_DIALOG';

export const GET_LIST_KARTU_PAKET_AGEN = 'GET_LIST_KARTU_PAKET_AGEN';
export const GET_LIST_KARTU_PAKET_AGEN_ERROR = 'GET_LIST_KARTU_PAKET_AGEN_ERROR';
export const GET_LIST_KARTU_PAKET_AGEN_SUCCESS = 'GET_LIST_KARTU_PAKET_AGEN_SUCCESS';

export const REFRESH_LIST_KARTU_PAKET_AGEN = 'REFRESH_LIST_KARTU_PAKET_AGEN';
export const EXIT_LIST_KARTU_PAKET_AGEN = 'EXIT_LIST_KARTU_PAKET_AGEN';

export const openListKartuPaketAgenDialog = () => ({ type: OPEN_LIST_KARTU_PAKET_AGEN_DIALOG });
export const closeListKartuPaketAgenDialog = () => ({ type: CLOSE_LIST_KARTU_PAKET_AGEN_DIALOG });

export const exitListKartuPaketAgen = () => ({ type: EXIT_LIST_KARTU_PAKET_AGEN });
export const refreshListKartuPaketAgen = () => ({ type: REFRESH_LIST_KARTU_PAKET_AGEN });

export function getListKartuPaketAgen(agenId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_KARTU_PAKET_AGEN });

    const listKartuPaket = await KartuPaketService.getListKartuPaketData();
    const listKartuPaketAgen = await TransaksiKartuPaketService.getListTransaksiKartuPaketData({ agenId });
    if (!listKartuPaket.success || !listKartuPaketAgen.success) {
      return dispatch({
        type: GET_LIST_KARTU_PAKET_AGEN_ERROR,
        payload: `${listKartuPaketAgen.msg}, ${listKartuPaket.msg}`
      });
    }

    const payload = {
      listKartuPaket: listKartuPaket.data,
      listKartuPaketAgen: listKartuPaketAgen.data
    };

    return dispatch({ type: GET_LIST_KARTU_PAKET_AGEN_SUCCESS, payload });
  };
}

export function deleteTransaksiKartuPaketAgen(id) {
  return async dispatch => {
    dispatch({ type: GET_LIST_KARTU_PAKET_AGEN });

    const result = await TransaksiKartuPaketService.deleteTransaksiKartuPaket(id);
    if (!result.success) {
      return dispatch({ type: GET_LIST_KARTU_PAKET_AGEN_ERROR, payload: result.msg });
    }

    dispatch(refreshListKartuPaket());
    dispatch(refreshListTransaksiKartuPaket());
    return dispatch(refreshListKartuPaketAgen());
  };
}
