import React from 'react';
import { TextField, Button, Icon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { refreshListTransaksiSaldo } from './store/actions';

function TransaksiSaldoToolbar() {
  const dispatch = useDispatch();

  return (
    <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <TextField label="Pilih Bulan" color="secondary" placeholder="Ketik Disini..." defaultValue="Bulan" />

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
          onClick={() => console.log('Transaksi Lain')}
        >
          Transaksi Lain
        </Button>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>arrow_upward</Icon>}
          onClick={() => console.log('Setor')}
        >
          Setor
        </Button>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>arrow_downward</Icon>}
          onClick={() => console.log('Tarik')}
        >
          Tarik
        </Button>
      </div>
    </div>
  );
}

export default TransaksiSaldoToolbar;
