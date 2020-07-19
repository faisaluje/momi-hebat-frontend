import KartuPaketService from '../../services/kartuPaket.service';

export const GET_LIST_KARTU_PAKET = 'GET_LIST_KARTU_PAKET';
export const GET_LIST_KARTU_PAKET_ERROR = 'GET_LIST_KARTU_PAKET_ERROR';
export const GET_LIST_KARTU_PAKET_SUCCESS = 'GET_LIST_KARTU_PAKET_SUCCESS';

export const SET_TXT_CARI_KARTU_PAKET = 'SET_TXT_CARI_KARTU_PAKET';
export const SET_PERIODE_KARTU_PAKET = 'SET_PERIODE_KARTU_PAKET';
export const REFRESH_LIST_KARTU_PAKET = 'REFRESH_LIST_KARTU_PAKET';
export const EXIT_LIST_KARTU_PAKET = 'EXIT_LIST_KARTU_PAKET';

export const exitListKartuPaket = () => ({ type: EXIT_LIST_KARTU_PAKET });
export const refreshListKartuPaket = () => ({ type: REFRESH_LIST_KARTU_PAKET });
export const setTxtCariKartuPaket = txtCari => ({ type: SET_TXT_CARI_KARTU_PAKET, txtCari });
export const setPeriodeKartuPaket = periodeId => ({ type: SET_PERIODE_KARTU_PAKET, periodeId });

export function getListKartuPaket(periodeId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_KARTU_PAKET });

    const listStokKartuPaket = await KartuPaketService.getListKartuPaketData(true, periodeId);
    if (!listStokKartuPaket.success) {
      return dispatch({ type: GET_LIST_KARTU_PAKET_ERROR, payload: listStokKartuPaket.msg });
    }

    return dispatch({ type: GET_LIST_KARTU_PAKET_SUCCESS, payload: listStokKartuPaket.data });
  };
}
