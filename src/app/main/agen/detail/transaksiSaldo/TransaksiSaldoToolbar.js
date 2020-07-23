import React from 'react';
import { Button, Icon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { refreshListTransaksiSaldo, openTransaksiSaldoDialog } from './store/actions';
import TransaksiSaldoDialog from './TransaksiSaldoDialog';
import TransaksiSaldoKategori from './TransaksiSaldoKategori';

function TransaksiSaldoToolbar() {
  const dispatch = useDispatch();

  return (
    <>
      <TransaksiSaldoDialog />
      <div className="m-8 mr-0 flex flex-wrap justify-between w-full">
        <div className="flex flex-wrap items-center">
          {/* <TextField
            variant="outlined"
            size="small"
            label="Pencarian"
            placeholder="Ketik Disini..."
            value={txtCari}
            onChange={event => dispatch(setTxtCariTransaksiSaldo(event.target.value))}
          /> */}
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>refresh</Icon>}
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
