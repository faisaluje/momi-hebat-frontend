import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon } from '@material-ui/core';
import { refreshListSaldo, setTxtCariSaldo } from './store/actions';

function SaldoToolbar() {
  const dispatch = useDispatch();
  const { txtCari } = useSelector(({ saldo }) => saldo.table);

  return (
    <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          placeholder="Ketik Disini..."
          value={txtCari}
          onChange={event => dispatch(setTxtCariSaldo(event.target.value))}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          className="ml-24"
          onClick={() => dispatch(refreshListSaldo())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        <Typography variant="h5">Pilihan Periode</Typography>
      </div>
    </div>
  );
}

export default SaldoToolbar;
