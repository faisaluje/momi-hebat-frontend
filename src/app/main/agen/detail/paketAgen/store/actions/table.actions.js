import PilihanPaketService from 'app/main/paket/services/pilihanPaket.service';
import { getDetailAgen } from '../../../store/actions';

export const GET_LIST_PAKET_AGEN = 'GET_LIST_PAKET_AGEN';
export const GET_LIST_PAKET_AGEN_ERROR = 'GET_LIST_PAKET_AGEN_ERROR';
export const GET_LIST_PAKET_AGEN_SUCCESS = 'GET_LIST_PAKET_AGEN_SUCCESS';

export const REFRESH_LIST_PAKET_AGEN = 'REFRESH_LIST_PAKET_AGEN';
export const EXIT_LIST_PAKET_AGEN = 'EXIT_LIST_PAKET_AGEN';

export const exitListPaketAgen = () => ({ type: EXIT_LIST_PAKET_AGEN });
export const refreshListPaketAgen = () => {
  return (dispatch, getState) => {
    const agenId = getState().detailAgen.panel.agen.id;

    dispatch(getDetailAgen(agenId));
    return dispatch({ type: REFRESH_LIST_PAKET_AGEN });
  };
};

export function getListPaketAgen() {
  return async (dispatch, _getState) => {
    dispatch({ type: GET_LIST_PAKET_AGEN });

    const listPaket = await PilihanPaketService.getListPilihanPaketData({ status: 'aktif' });
    if (!listPaket.success) {
      return dispatch({ type: GET_LIST_PAKET_AGEN_ERROR, payload: listPaket.msg });
    }

    return dispatch({ type: GET_LIST_PAKET_AGEN_SUCCESS, payload: listPaket.data });
  };
}
