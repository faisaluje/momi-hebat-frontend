import SaldoService from 'app/main/saldo/services/saldo.service';

export const SET_DETAIL_AGEN = 'SET_DETAIL_AGEN';
export const EXIT_DETAIL_AGEN = 'EXIT_DETAIL_AGEN';

export const SET_SALDO_AGEN = 'SET_SALDO_AGEN';
export const SET_SALDO_AGEN_SUCCESS = 'SET_SALDO_AGEN_SUCCESS';
export const SET_SALDO_AGEN_ERROR = 'SET_SALDO_AGEN_ERROR';

export const setDetailAgen = agen => ({ type: SET_DETAIL_AGEN, agen });
export const exitDetailAgen = () => ({ type: EXIT_DETAIL_AGEN });

export function setSaldoAgen(agenId) {
  return async dispatch => {
    dispatch({ type: SET_SALDO_AGEN });

    const saldoAgen = await SaldoService.getSaldo();
    if (!saldoAgen.success) {
      return dispatch({ type: SET_SALDO_AGEN_ERROR, payload: saldoAgen.msg });
    }

    const saldo = saldoAgen.data.find(val => val.agen === agenId);
    return dispatch({
      type: SET_SALDO_AGEN_SUCCESS,
      payload: saldo
    });
  };
}
