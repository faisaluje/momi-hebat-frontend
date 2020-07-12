import TransaksiSaldoService from '../../services/transaksiSaldo.service';
import { refreshListTransaksiSaldo } from './table.actions';

export const OPEN_TRANSAKSI_SALDO_DIALOG = 'OPEN_TRANSAKSI_SALDO_DIALOG';
export const CLOSE_TRANSAKSI_SALDO_DIALOG = 'CLOSE_TRANSAKSI_SALDO_DIALOG';

export const SET_TRANSAKSI_SALDO_FORM = 'SET_TRANSAKSI_SALDO_FORM';

export const SAVE_TRANSAKSI_SALDO = 'SAVE_TRANSAKSI_SALDO';
export const SAVE_TRANSAKSI_SALDO_ERROR = 'SAVE_TRANSAKSI_SALDO_ERROR';
export const SAVE_TRANSAKSI_SALDO_SUCCESS = 'SAVE_TRANSAKSI_SALDO_SUCCESS';

export const setTransaksiSaldoForm = data => ({ type: SET_TRANSAKSI_SALDO_FORM, data });
export const openTransaksiSaldoDialog = kategori => ({ type: OPEN_TRANSAKSI_SALDO_DIALOG, kategori });
export const closeTransaksiSaldoDialog = () => ({ type: CLOSE_TRANSAKSI_SALDO_DIALOG });

export function createTransaksiSaldo(data) {
  return async dispatch => {
    dispatch({ type: SAVE_TRANSAKSI_SALDO });

    const result = await TransaksiSaldoService.createTransaksiSaldo(data);
    if (!result.success) {
      return dispatch({ type: SAVE_TRANSAKSI_SALDO_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_TRANSAKSI_SALDO_SUCCESS, payload: result.data });
    dispatch(refreshListTransaksiSaldo());
    return dispatch(closeTransaksiSaldoDialog());
  };
}
