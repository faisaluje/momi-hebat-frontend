import PilihanPaketService from 'app/main/paket/services/pilihanPaket.service';
import { refreshListPilihanPaket } from './list.actions';

export const OPEN_PILIHAN_PAKET_DIALOG = 'OPEN_PILIHAN_PAKET_DIALOG';
export const CLOSE_PILIHAN_PAKET_DIALOG = 'CLOSE_PILIHAN_PAKET_DIALOG';

export const SET_PILIHAN_PAKET_FORM = 'SET_PILIHAN_PAKET_FORM';

export const SAVE_PILIHAN_PAKET = 'SAVE_PILIHAN_PAKET';
export const SAVE_PILIHAN_PAKET_ERROR = 'SAVE_PILIHAN_PAKET_ERROR';
export const SAVE_PILIHAN_PAKET_SUCCESS = 'SAVE_PILIHAN_PAKET_SUCCESS';

export const setPilihanPaketForm = data => ({ type: SET_PILIHAN_PAKET_FORM, data });
export const openPilihanPaketDialog = () => ({ type: OPEN_PILIHAN_PAKET_DIALOG });
export const closePilihanPaketDialog = () => ({ type: CLOSE_PILIHAN_PAKET_DIALOG });

export function savePilihanPaket(data) {
  return async dispatch => {
    dispatch({ type: SAVE_PILIHAN_PAKET });

    let result = { success: false };
    if (!data._id) {
      result = await PilihanPaketService.createPilihanPaket({
        ...data,
        jenisPaket: data.jenisPaket.id
      });
    } else {
      const { _id } = data;
      delete data._id;
      result = await PilihanPaketService.updatePilihanPaket(_id, data);
    }

    if (!result.success) {
      return dispatch({ type: SAVE_PILIHAN_PAKET_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_PILIHAN_PAKET_SUCCESS, payload: result.data });
    dispatch(refreshListPilihanPaket());
    return dispatch(closePilihanPaketDialog());
  };
}
