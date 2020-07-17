import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import TransaksiPaketPanel from './transaksiPaket/TransaksiPaketPanel';
import TransaksiSaldoPanel from './transaksiSaldo/TransaksiSaldoPanel';
import { exitListTransaksiSaldo } from './transaksiSaldo/store/actions';
import { exitListKartuPaketAgen } from './transaksiPaket/kartuPaketAgen/store/actions';

function DetailAgenTabs() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    return () => {
      dispatch(exitListTransaksiSaldo());
      dispatch(exitListKartuPaketAgen());
    };
  }, [dispatch]);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className="flex flex-col w-full" elevation={5} style={{ height: '75%' }}>
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Saldo" className="capitalize" />
          <Tab label="Paket" className="capitalize" />
        </Tabs>
      </AppBar>
      {value === 0 && <TransaksiSaldoPanel />}
      {value === 1 && <TransaksiPaketPanel />}
    </Paper>
  );
}

export default DetailAgenTabs;
