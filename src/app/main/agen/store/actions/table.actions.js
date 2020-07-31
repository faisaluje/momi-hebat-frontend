import AgenService from '../../services/agen.service';

export const GET_LIST_AGEN = 'GET_LIST_AGEN';
export const GET_LIST_AGEN_ERROR = 'GET_LIST_AGEN_ERROR';
export const GET_LIST_AGEN_SUCCESS = 'GET_LIST_AGEN_SUCCESS';

export const SET_LIST_AGEN_PAGE = 'SET_LIST_AGEN_PAGE';
export const SET_TXT_CARI_AGEN = 'SET_TXT_CARI_AGEN';
export const SET_STATUS_AGEN = 'SET_STATUS_AGEN';
export const SET_LEVEL_AGEN = 'SET_LEVEL_AGEN';
export const SET_TGL_LAHIR_AGEN = 'SET_TGL_LAHIR_AGEN';
export const REFRESH_LIST_AGEN = 'REFRESH_LIST_AGEN';
export const EXIT_LIST_AGEN = 'EXIT_LIST_AGEN';

export const exitListAgen = () => ({ type: EXIT_LIST_AGEN });
export const refreshListAgen = () => ({ type: REFRESH_LIST_AGEN });
export const setTxtCariAgen = txtCari => ({ type: SET_TXT_CARI_AGEN, txtCari });
export const setStatusAgen = status => ({ type: SET_STATUS_AGEN, status });
export const setLevelAgen = level => ({ type: SET_LEVEL_AGEN, level });
export const setListAgenPage = page => ({ type: SET_LIST_AGEN_PAGE, page });
export const setTglLahirAgen = tglLahir => ({ type: SET_TGL_LAHIR_AGEN, tglLahir });

export function getListAgen(params) {
  return async dispatch => {
    dispatch({ type: GET_LIST_AGEN });

    const listAgen = await AgenService.getListAgenData(params);
    if (!listAgen.success) {
      return dispatch({ type: GET_LIST_AGEN_ERROR, payload: listAgen.msg });
    }

    return dispatch({ type: GET_LIST_AGEN_SUCCESS, payload: listAgen.data });
  };
}
