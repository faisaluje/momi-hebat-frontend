import { getDetailAgen } from '../../../store/actions';
import TransaksiSaldoService from '../../services/transaksiSaldo.service';

export const GET_LIST_TRANSAKSI_SALDO = 'GET_LIST_TRANSAKSI_SALDO';
export const GET_LIST_TRANSAKSI_SALDO_ERROR = 'GET_LIST_TRANSAKSI_SALDO_ERROR';
export const GET_LIST_TRANSAKSI_SALDO_SUCCESS = 'GET_LIST_TRANSAKSI_SALDO_SUCCESS';

export const SET_TXT_CARI_TRANSAKSI_SALDO = 'SET_TXT_CARI_TRANSAKSI_SALDO';
export const REFRESH_LIST_TRANSAKSI_SALDO = 'REFRESH_LIST_TRANSAKSI_SALDO';
export const EXIT_LIST_TRANSAKSI_SALDO = 'EXIT_LIST_TRANSAKSI_SALDO';

export const exitListTransaksiSaldo = () => ({ type: EXIT_LIST_TRANSAKSI_SALDO });
export const refreshListTransaksiSaldo = () => {
  return (dispatch, getState) => {
    const agenId = getState().detailAgen.panel.agen.id;

    dispatch(getDetailAgen(agenId));
    return dispatch({ type: REFRESH_LIST_TRANSAKSI_SALDO });
  };
};
export const setTxtCariTransaksiSaldo = txtCari => ({ type: SET_TXT_CARI_TRANSAKSI_SALDO, txtCari });

export function getListTransaksiSaldo(agenId) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_SALDO });

    const listTransaksiSaldo = await TransaksiSaldoService.getListTransaksiSaldo(agenId);
    if (!listTransaksiSaldo.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_SALDO_ERROR, payload: listTransaksiSaldo.msg });
    }

    return dispatch({ type: GET_LIST_TRANSAKSI_SALDO_SUCCESS, payload: listTransaksiSaldo.data });
  };
}

export function deleteTransaksiSaldo(id) {
  return async dispatch => {
    dispatch({ type: GET_LIST_TRANSAKSI_SALDO });

    const result = await TransaksiSaldoService.deleteTransaksiSaldo(id);
    console.log(result);
    if (!result.success) {
      return dispatch({ type: GET_LIST_TRANSAKSI_SALDO_ERROR, payload: result.msg });
    }

    return dispatch(refreshListTransaksiSaldo());
  };
}
