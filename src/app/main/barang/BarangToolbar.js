import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon, Paper } from '@material-ui/core';
import {
  openListTransaksiBarangDialog,
  openTransaksiBarangDialog,
  refreshListBarang,
  setTxtCariBarang
} from './store/actions';

function BarangToolbar() {
  const dispatch = useDispatch();
  const { txtCari } = useSelector(({ barang }) => barang.table);

  return (
    <Paper elevation={3} className="p-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Ketik Disini..."
          value={txtCari}
          onChange={event => dispatch(setTxtCariBarang(event.target.value))}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          className="ml-24"
          onClick={() => dispatch(refreshListBarang())}
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
          onClick={() => dispatch(openListTransaksiBarangDialog())}
        >
          Daftar Transaksi
        </Button>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={() => dispatch(openTransaksiBarangDialog())}
        >
          Barang Masuk
        </Button>
      </div>
    </Paper>
  );
}

export default BarangToolbar;
