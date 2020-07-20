import { Button, Icon, MenuItem, TextField } from '@material-ui/core';
import AgenStatus from 'app/main/agen/AgenStatus';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPilihanPaketDialog, refreshListPilihanPaket, setStatusPilihanPaket } from './store/actions';

function PilihanPaketToolbar() {
  const dispatch = useDispatch();
  const { status } = useSelector(({ pilihanPaket }) => pilihanPaket.list);

  return (
    <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          onClick={() => dispatch(refreshListPilihanPaket())}
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
          label="Status"
          value={status}
          onChange={event => dispatch(setStatusPilihanPaket(event.target.value))}
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
          onClick={() => dispatch(openPilihanPaketDialog())}
        >
          Tambah Pilihan Paket
        </Button>
      </div>
    </div>
  );
}

export default PilihanPaketToolbar;
