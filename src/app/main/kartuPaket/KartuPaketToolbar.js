import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon, Paper } from '@material-ui/core';
import {
  openListTransaksiKartuPaketDialog,
  openTransaksiKartuPaketDialog,
  refreshListKartuPaket,
  setTxtCariKartuPaket
} from './store/actions';

function KartuPaketToolbar() {
  const dispatch = useDispatch();
  const { txtCari } = useSelector(({ kartuPaket }) => kartuPaket.table);

  return (
    <Paper elevation={3} className="p-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Ketik Disini..."
          value={txtCari}
          onChange={event => dispatch(setTxtCariKartuPaket(event.target.value))}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          className="ml-24"
          onClick={() => dispatch(refreshListKartuPaket())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        {/* <Typography variant="h5">Pilihan Periode</Typography> */}

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>transform</Icon>}
          onClick={() => dispatch(openListTransaksiKartuPaketDialog())}
        >
          Daftar Transaksi
        </Button>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={() => dispatch(openTransaksiKartuPaketDialog())}
        >
          Kartu Paket Masuk
        </Button>
      </div>
    </Paper>
  );
}

export default KartuPaketToolbar;
