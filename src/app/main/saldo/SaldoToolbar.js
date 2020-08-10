import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon, IconButton, Paper } from '@material-ui/core';
import { thousandSeparator } from 'app/Utils';
import Axios from 'axios';
import { URL_API } from 'app/Constants';
import { refreshListSaldo, setTxtCariSaldo } from './store/actions';

function SaldoToolbar() {
  const dispatch = useDispatch();
  const { txtCari } = useSelector(({ saldo }) => saldo.table);
  const [pencarian, setPencarian] = React.useState(txtCari);
  const [totalSaldo, setTotalSaldo] = React.useState(undefined);

  React.useEffect(() => {
    if (typeof totalSaldo === 'undefined') {
      Axios.get(`${URL_API}/agen/total-saldo`, { timeout: 30000 })
        .then(result => {
          setTotalSaldo(result.data?.saldo || 0);
        })
        .catch(() => setTotalSaldo(0));
    }
  }, [totalSaldo]);

  const submitPencarian = e => {
    if (e.key === 'Enter') {
      dispatch(setTxtCariSaldo(pencarian));
    }
  };

  return (
    <Paper elevation={3} className="p-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Ketik Disini..."
          value={pencarian}
          onChange={event => setPencarian(event.target.value)}
          InputProps={{
            endAdornment: pencarian && (
              <IconButton size="small" onClick={() => setPencarian('')}>
                <Icon>close</Icon>
              </IconButton>
            )
          }}
          onKeyPress={submitPencarian}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>search</Icon>}
          className="ml-0 sm:ml-8"
          onClick={() => dispatch(setTxtCariSaldo(pencarian))}
        >
          Cari
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        <Typography className="font-bold text-20">
          Total Seluruh Saldo Agen : Rp. {thousandSeparator(totalSaldo)}
        </Typography>

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
        {/* <Typography variant="h5">Pilihan Periode</Typography> */}
      </div>
    </Paper>
  );
}

export default SaldoToolbar;
