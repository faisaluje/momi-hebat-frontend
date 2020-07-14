import PaketService from 'app/main/paket/services/paket.service';
import PackingService from '../../services/packing.service';

export const GET_LIST_PACKING = 'GET_LIST_PACKING';
export const GET_LIST_PACKING_ERROR = 'GET_LIST_PACKING_ERROR';
export const GET_LIST_PACKING_SUCCESS = 'GET_LIST_PACKING_SUCCESS';

export const SET_TXT_CARI_PACKING = 'SET_TXT_CARI_PACKING';
export const SET_PERIODE_PACKING = 'SET_PERIODE_PACKING';
export const REFRESH_LIST_PACKING = 'REFRESH_LIST_PACKING';
export const EXIT_LIST_PACKING = 'EXIT_LIST_PACKING';

export const exitListPacking = () => ({ type: EXIT_LIST_PACKING });
export const refreshListPacking = () => ({ type: REFRESH_LIST_PACKING });
export const setTxtCariPacking = txtCari => ({ type: SET_TXT_CARI_PACKING, txtCari });
export const setPeriodePacking = periodeId => ({ type: SET_PERIODE_PACKING, periodeId });

export function getListPacking(periodeId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_PACKING });

    const listPaket = await PaketService.getListPaketData('aktif', periodeId);
    const listPacking = await PackingService.getListPackingData(periodeId);
    if (!listPacking.success || !listPacking.success) {
      return dispatch({ type: GET_LIST_PACKING_ERROR, payload: `${listPacking.msg}, ${listPaket.msg}` });
    }

    const payload = {
      listPaket: listPaket.data,
      listPacking: listPacking.data
    };

    return dispatch({ type: GET_LIST_PACKING_SUCCESS, payload });
  };
}

export function deletePacking(id) {
  return async dispatch => {
    dispatch({ type: GET_LIST_PACKING });

    const result = await PackingService.deletePacking(id);
    if (!result.success) {
      return dispatch({ type: GET_LIST_PACKING_ERROR, payload: result.msg });
    }

    return dispatch(refreshListPacking());
  };
}
