import DetailService from '../../services/detail.service';

export const GET_DETAIL_AGEN = 'GET_DETAIL_AGEN';
export const GET_DETAIL_AGEN_ERROR = 'GET_DETAIL_AGEN_ERROR';
export const GET_DETAIL_AGEN_SUCCESS = 'GET_DETAIL_AGEN_SUCCESS';

export const SET_DETAIL_AGEN = 'SET_DETAIL_AGEN';
export const EXIT_DETAIL_AGEN = 'EXIT_DETAIL_AGEN';

export const setDetailAgen = agen => ({ type: SET_DETAIL_AGEN, agen });
export const exitDetailAgen = () => ({ type: EXIT_DETAIL_AGEN });

export function getDetailAgen(agenId) {
  return async dispatch => {
    dispatch({ type: GET_DETAIL_AGEN });

    const detailAgen = await DetailService.getDetailAgenData(agenId);
    if (!detailAgen.success) {
      return dispatch({ type: GET_DETAIL_AGEN_ERROR, payload: detailAgen.msg });
    }

    return dispatch({ type: GET_DETAIL_AGEN_SUCCESS, payload: detailAgen.data });
  };
}
