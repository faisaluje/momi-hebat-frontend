import PilihanPaketService from 'app/main/paket/services/pilihanPaket.service';

export const OPEN_LIST_PILIHAN_PAKET_DIALOG = 'OPEN_LIST_PILIHAN_PAKET_DIALOG';
export const CLOSE_LIST_PILIHAN_PAKET_DIALOG = 'CLOSE_LIST_PILIHAN_PAKET_DIALOG';

export const GET_LIST_PILIHAN_PAKET = 'GET_LIST_PILIHAN_PAKET';
export const GET_LIST_PILIHAN_PAKET_ERROR = 'GET_LIST_PILIHAN_PAKET_ERROR';
export const GET_LIST_PILIHAN_PAKET_SUCCESS = 'GET_LIST_PILIHAN_PAKET_SUCCESS';

export const SET_TXT_CARI_PILIHAN_PAKET = 'SET_TXT_CARI_PILIHAN_PAKET';
export const SET_STATUS_PILIHAN_PAKET = 'SET_STATUS_PILIHAN_PAKET';
export const REFRESH_LIST_PILIHAN_PAKET = 'REFRESH_LIST_PILIHAN_PAKET';
export const EXIT_LIST_PILIHAN_PAKET = 'EXIT_LIST_PILIHAN_PAKET';

export const openListPilihanPaketDialog = () => ({ type: OPEN_LIST_PILIHAN_PAKET_DIALOG });
export const closeListPilihanPaketDialog = () => ({ type: CLOSE_LIST_PILIHAN_PAKET_DIALOG });

export const exitListPilihanPaket = () => ({ type: EXIT_LIST_PILIHAN_PAKET });
export const refreshListPilihanPaket = () => ({ type: REFRESH_LIST_PILIHAN_PAKET });
export const setTxtCariPilihanPaket = txtCari => ({ type: SET_TXT_CARI_PILIHAN_PAKET, txtCari });
export const setStatusPilihanPaket = status => ({ type: SET_STATUS_PILIHAN_PAKET, status });

export function getListPilihanPaket(params) {
  return async dispatch => {
    dispatch({ type: GET_LIST_PILIHAN_PAKET });

    const listPilihanPaket = await PilihanPaketService.getListPilihanPaketData(params);
    if (!listPilihanPaket.success) {
      return dispatch({ type: GET_LIST_PILIHAN_PAKET_ERROR, payload: listPilihanPaket.msg });
    }

    return dispatch({ type: GET_LIST_PILIHAN_PAKET_SUCCESS, payload: listPilihanPaket.data });
  };
}

export function updateStatusPilihanPaket(data) {
  return async dispatch => {
    dispatch({ type: GET_LIST_PILIHAN_PAKET });

    const { id } = data;
    delete data.id;

    const result = await PilihanPaketService.updatePilihanPaket(id, data);
    if (!result.success) {
      return dispatch({ type: GET_LIST_PILIHAN_PAKET_ERROR, payload: result.msg });
    }

    return dispatch(refreshListPilihanPaket());
  };
}
