import KartuPaketService from '../../services/kartuPaket.service';
import { refreshListKartuPaket } from './table.actions';
import { refreshListTransaksiKartuPaket } from './transaksi.actions';

export const OPEN_KARTU_PAKET_DIALOG = 'OPEN_KARTU_PAKET_DIALOG';
export const CLOSE_KARTU_PAKET_DIALOG = 'CLOSE_KARTU_PAKET_DIALOG';

export const SET_KARTU_PAKET_FORM = 'SET_KARTU_PAKET_FORM';

export const SAVE_KARTU_PAKET = 'SAVE_KARTU_PAKET';
export const SAVE_KARTU_PAKET_ERROR = 'SAVE_KARTU_PAKET_ERROR';
export const SAVE_KARTU_PAKET_SUCCESS = 'SAVE_KARTU_PAKET_SUCCESS';

export const setKartuPaketForm = data => ({ type: SET_KARTU_PAKET_FORM, data });
export const openKartuPaketDialog = () => ({ type: OPEN_KARTU_PAKET_DIALOG });
export const closeKartuPaketDialog = () => ({ type: CLOSE_KARTU_PAKET_DIALOG });

export function saveKartuPaket(data) {
  return async dispatch => {
    dispatch({ type: SAVE_KARTU_PAKET });

    let result = { success: false };
    const { id } = data;
    delete data.id;
    result = await KartuPaketService.updateKartuPaket(id, data);

    if (!result.success) {
      return dispatch({ type: SAVE_KARTU_PAKET_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_KARTU_PAKET_SUCCESS, payload: result.data });
    dispatch(refreshListKartuPaket());
    dispatch(refreshListTransaksiKartuPaket());
    return dispatch(closeKartuPaketDialog());
  };
}
