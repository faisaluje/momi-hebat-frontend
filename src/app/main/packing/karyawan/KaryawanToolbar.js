import { Button, Icon, MenuItem, TextField, Typography } from '@material-ui/core';
import AgenStatus from 'app/main/agen/AgenStatus';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openKaryawanDialog, refreshListKaryawan, setStatusKaryawan, setTxtCariKaryawan } from './store/actions';

function KaryawanToolbar() {
  const dispatch = useDispatch();
  const { txtCari, status } = useSelector(({ karyawan }) => karyawan.table);

  return (
    <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Ketik Disini..."
          value={txtCari}
          onChange={event => dispatch(setTxtCariKaryawan(event.target.value))}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          className="ml-24"
          onClick={() => dispatch(refreshListKaryawan())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        <TextField
          select
          variant="outlined"
          size="small"
          style={{ width: '12rem' }}
          color="secondary"
          label="Status Agen"
          value={status}
          onChange={event => dispatch(setStatusKaryawan(event.target.value))}
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
          startIcon={<Icon>add</Icon>}
          onClick={() => dispatch(openKaryawanDialog())}
        >
          Tambah Karyawan
        </Button>
      </div>
    </div>
  );
}

export default KaryawanToolbar;
