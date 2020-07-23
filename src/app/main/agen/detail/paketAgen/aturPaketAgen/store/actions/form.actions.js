import { refreshListTransaksiSaldo } from 'app/main/agen/detail/transaksiSaldo/store/actions';
import { refreshListPaket } from 'app/main/paket/store/actions';
import AturPaketService from '../../../services/aturPaket.service';
import { refreshListPaketAgen } from '../../../store/actions';
import { refreshListAturPaketAgen } from './list.actions';

export const OPEN_ATUR_PAKET_AGEN_DIALOG = 'OPEN_ATUR_PAKET_AGEN_DIALOG';
export const CLOSE_ATUR_PAKET_AGEN_DIALOG = 'CLOSE_ATUR_PAKET_AGEN_DIALOG';

export const SET_ATUR_PAKET_AGEN_FORM = 'SET_ATUR_PAKET_AGEN_FORM';

export const SAVE_ATUR_PAKET_AGEN = 'SAVE_ATUR_PAKET_AGEN';
export const SAVE_ATUR_PAKET_AGEN_ERROR = 'SAVE_ATUR_PAKET_AGEN_ERROR';
export const SAVE_ATUR_PAKET_AGEN_SUCCESS = 'SAVE_ATUR_PAKET_AGEN_SUCCESS';

export const setAturPaketAgenForm = data => ({ type: SET_ATUR_PAKET_AGEN_FORM, data });
export const openAturPaketAgenDialog = jenis => ({ type: OPEN_ATUR_PAKET_AGEN_DIALOG, jenis });
export const closeAturPaketAgenDialog = () => ({ type: CLOSE_ATUR_PAKET_AGEN_DIALOG });

export function createAturPaketAgen(data) {
  return async dispatch => {
    dispatch({ type: SAVE_ATUR_PAKET_AGEN });

    const result = await AturPaketService.createAturPaketAgen(data);
    if (!result.success) {
      return dispatch({ type: SAVE_ATUR_PAKET_AGEN_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_ATUR_PAKET_AGEN_SUCCESS });
    dispatch(refreshListAturPaketAgen());
    dispatch(refreshListPaketAgen());
    dispatch(refreshListTransaksiSaldo());
    dispatch(refreshListPaket());
    return dispatch(closeAturPaketAgenDialog());
  };
}
