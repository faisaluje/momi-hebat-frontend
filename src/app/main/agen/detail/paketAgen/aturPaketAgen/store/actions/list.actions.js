import AturPaketService from '../../../services/aturPaket.service';

export const OPEN_LIST_ATUR_PAKET_AGEN_DIALOG = 'OPEN_LIST_ATUR_PAKET_AGEN_DIALOG';
export const CLOSE_LIST_ATUR_PAKET_AGEN_DIALOG = 'CLOSE_LIST_ATUR_PAKET_AGEN_DIALOG';

export const GET_LIST_ATUR_PAKET_AGEN = 'GET_LIST_ATUR_PAKET_AGEN';
export const GET_LIST_ATUR_PAKET_AGEN_ERROR = 'GET_LIST_ATUR_PAKET_AGEN_ERROR';
export const GET_LIST_ATUR_PAKET_AGEN_SUCCESS = 'GET_LIST_ATUR_PAKET_AGEN_SUCCESS';

export const REFRESH_LIST_ATUR_PAKET_AGEN = 'REFRESH_LIST_ATUR_PAKET_AGEN';
export const EXIT_LIST_ATUR_PAKET_AGEN = 'EXIT_LIST_ATUR_PAKET_AGEN';

export const openListAturPaketAgenDialog = () => ({ type: OPEN_LIST_ATUR_PAKET_AGEN_DIALOG });
export const closeListAturPaketAgenDialog = () => ({ type: CLOSE_LIST_ATUR_PAKET_AGEN_DIALOG });

export const exitListAturPaketAgen = () => ({ type: EXIT_LIST_ATUR_PAKET_AGEN });
export const refreshListAturPaketAgen = () => ({ type: REFRESH_LIST_ATUR_PAKET_AGEN });

export function getListAturPaketAgen(agenId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_ATUR_PAKET_AGEN });

    const listAturPaket = await AturPaketService.getListAturPaketAgenData(agenId);
    if (!listAturPaket.success) {
      return dispatch({
        type: GET_LIST_ATUR_PAKET_AGEN_ERROR,
        payload: listAturPaket.msg
      });
    }

    return dispatch({ type: GET_LIST_ATUR_PAKET_AGEN_SUCCESS, payload: listAturPaket.data });
  };
}
