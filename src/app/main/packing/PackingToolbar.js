import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon, Paper } from '@material-ui/core';
import { openPackingDialog, refreshListPacking, setTxtCariPacking } from './store/actions';
import { openListKaryawanDialog } from './karyawan/store/actions';

function PackingToolbar() {
  const dispatch = useDispatch();
  const { txtCari } = useSelector(({ packing }) => packing.table);

  return (
    <Paper elevation={3} className="p-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Ketik Disini..."
          value={txtCari}
          onChange={event => dispatch(setTxtCariPacking(event.target.value))}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          className="ml-24"
          onClick={() => dispatch(refreshListPacking())}
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
          startIcon={<Icon>group</Icon>}
          onClick={() => dispatch(openListKaryawanDialog())}
        >
          Karyawan
        </Button>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={() => dispatch(openPackingDialog())}
        >
          Tambah
        </Button>
      </div>
    </Paper>
  );
}

export default PackingToolbar;
