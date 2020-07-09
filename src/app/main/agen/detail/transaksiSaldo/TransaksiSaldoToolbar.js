import React from 'react';
import { TextField, Button, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { refreshListTransaksiSaldo, setTxtCariTransaksiSaldo, openTransaksiSaldoDialog } from './store/actions';
import TransaksiSaldoDialog from './TransaksiSaldoDialog';
import TransaksiSaldoKategori from './TransaksiSaldoKategori';

function TransaksiSaldoToolbar() {
  const dispatch = useDispatch();
  const { txtCari } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);

  return (
    <>
      <TransaksiSaldoDialog />
      <div className="m-8 mr-0 flex flex-wrap justify-between">
        <div className="flex flex-wrap items-center">
          <TextField
            label="Pencarian"
            color="secondary"
            placeholder="Ketik Disini..."
            value={txtCari}
            onChange={event => dispatch(setTxtCariTransaksiSaldo(event.target.value))}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>refresh</Icon>}
            className="ml-0 sm:ml-24"
            onClick={() => dispatch(refreshListTransaksiSaldo())}
          >
            Refresh
          </Button>
        </div>

        <div className="flex flex-wrap items-center">
          <Button
            className="ml-0 sm:ml-12"
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>add</Icon>}
            onClick={() => dispatch(openTransaksiSaldoDialog(TransaksiSaldoKategori.TRANSAKSI_LAIN))}
          >
            Transaksi Lain
          </Button>

          <Button
            className="ml-0 sm:ml-12"
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>arrow_upward</Icon>}
            onClick={() => dispatch(openTransaksiSaldoDialog(TransaksiSaldoKategori.SETORAN))}
          >
            Setor
          </Button>

          <Button
            className="ml-0 sm:ml-12"
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>arrow_downward</Icon>}
            onClick={() => dispatch(openTransaksiSaldoDialog(TransaksiSaldoKategori.PENARIKAN))}
          >
            Tarik
          </Button>
        </div>
      </div>
    </>
  );
}

export default TransaksiSaldoToolbar;
