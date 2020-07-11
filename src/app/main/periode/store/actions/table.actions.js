import PeriodeService from '../../services/periode.service';

export const GET_LIST_PERIODE = 'GET_LIST_PERIODE';
export const GET_LIST_PERIODE_ERROR = 'GET_LIST_PERIODE_ERROR';
export const GET_LIST_PERIODE_SUCCESS = 'GET_LIST_PERIODE_SUCCESS';

export const SET_TXT_CARI_PERIODE = 'SET_TXT_CARI_PERIODE';
export const REFRESH_LIST_PERIODE = 'REFRESH_LIST_PERIODE';
export const EXIT_LIST_PERIODE = 'EXIT_LIST_PERIODE';

export const exitListPeriode = () => ({ type: EXIT_LIST_PERIODE });
export const refreshListPeriode = () => ({ type: REFRESH_LIST_PERIODE });
export const setTxtCariPeriode = txtCari => ({ type: SET_TXT_CARI_PERIODE, txtCari });

export function getListPeriode() {
  return async dispatch => {
    dispatch({ type: GET_LIST_PERIODE });

    const listPeriode = await PeriodeService.getListPeriodeData();
    if (!listPeriode.success) {
      return dispatch({ type: GET_LIST_PERIODE_ERROR, payload: listPeriode.msg });
    }

    return dispatch({ type: GET_LIST_PERIODE_SUCCESS, payload: listPeriode.data });
  };
}
