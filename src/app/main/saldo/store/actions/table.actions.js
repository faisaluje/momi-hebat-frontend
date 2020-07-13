import SaldoService from '../../services/saldo.service';

export const GET_LIST_SALDO = 'GET_LIST_SALDO';
export const GET_LIST_SALDO_ERROR = 'GET_LIST_SALDO_ERROR';
export const GET_LIST_SALDO_SUCCESS = 'GET_LIST_SALDO_SUCCESS';

export const SET_TXT_CARI_SALDO = 'SET_TXT_CARI_SALDO';
export const SET_PERIODE_SALDO = 'SET_PERIODE_SALDO';
export const REFRESH_LIST_SALDO = 'REFRESH_LIST_SALDO';
export const EXIT_LIST_SALDO = 'EXIT_LIST_SALDO';

export const exitListSaldo = () => ({ type: EXIT_LIST_SALDO });
export const refreshListSaldo = () => ({ type: REFRESH_LIST_SALDO });
export const setTxtCariSaldo = txtCari => ({ type: SET_TXT_CARI_SALDO, txtCari });
export const setPeriodeSaldo = periodeId => ({ type: SET_PERIODE_SALDO, periodeId });

export function getListSaldo(periodeId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_SALDO });

    // const listSaldo = await SaldoService.getSaldo(periodeId);
    const listSaldo = await SaldoService.getSaldoWithAgen(periodeId);
    if (!listSaldo.success) {
      return dispatch({ type: GET_LIST_SALDO_ERROR, payload: listSaldo.msg || 'Gagal mendapatkan data' });
    }

    return dispatch({ type: GET_LIST_SALDO_SUCCESS, payload: listSaldo.data });
  };
}
