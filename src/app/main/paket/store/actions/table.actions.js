import PaketService from '../../services/paket.service';

export const GET_LIST_PAKET = 'GET_LIST_PAKET';
export const GET_LIST_PAKET_ERROR = 'GET_LIST_PAKET_ERROR';
export const GET_LIST_PAKET_SUCCESS = 'GET_LIST_PAKET_SUCCESS';

export const SET_TXT_CARI_PAKET = 'SET_TXT_CARI_PAKET';
export const SET_STATUS_PAKET = 'SET_STATUS_PAKET';
export const SET_PERIODE_PAKET = 'SET_PERIODE_PAKET';
export const REFRESH_LIST_PAKET = 'REFRESH_LIST_PAKET';
export const EXIT_LIST_PAKET = 'EXIT_LIST_PAKET';

export const exitListPaket = () => ({ type: EXIT_LIST_PAKET });
export const refreshListPaket = () => ({ type: REFRESH_LIST_PAKET });
export const setTxtCariPaket = txtCari => ({ type: SET_TXT_CARI_PAKET, txtCari });
export const setPeriodePaket = periodeId => ({ type: SET_PERIODE_PAKET, periodeId });
export const setStatusPaket = status => ({ type: SET_STATUS_PAKET, status });

export function getListPaket(status, periodeId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_PAKET });

    const listPaket = await PaketService.getListPaketData(status, periodeId);
    if (!listPaket.success) {
      return dispatch({ type: GET_LIST_PAKET_ERROR, payload: listPaket.msg });
    }

    return dispatch({ type: GET_LIST_PAKET_SUCCESS, payload: listPaket.data });
  };
}
