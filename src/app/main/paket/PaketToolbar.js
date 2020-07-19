import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon, MenuItem, Paper } from '@material-ui/core';
import { openPaketDialog, refreshListPaket, setStatusPaket, setTxtCariPaket } from './store/actions';
import AgenStatus from '../agen/AgenStatus';

function PaketToolbar() {
  const dispatch = useDispatch();
  const { txtCari, status } = useSelector(({ paket }) => paket.table);

  return (
    <Paper elevation={3} className="p-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Ketik Disini..."
          value={txtCari}
          onChange={event => dispatch(setTxtCariPaket(event.target.value))}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          className="ml-24"
          onClick={() => dispatch(refreshListPaket())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        {/* <Typography variant="h5">Pilihan Periode</Typography> */}
        <TextField
          select
          variant="outlined"
          size="small"
          style={{ width: '12rem' }}
          color="secondary"
          label="Status Paket"
          value={status}
          onChange={event => dispatch(setStatusPaket(event.target.value))}
        >
          {Object.values(AgenStatus).map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>category</Icon>}
          // onClick={() => dispatch(openListTransaksiBarangDialog())}
        >
          Pilihan Paket
        </Button>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={() => dispatch(openPaketDialog())}
        >
          Tambah
        </Button>
      </div>
    </Paper>
  );
}

export default PaketToolbar;
