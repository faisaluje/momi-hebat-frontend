import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import TransaksiPaketPanel from './transaksiPaket/TransaksiPaketPanel';
import TransaksiSaldoPanel from './transaksiSaldo/TransaksiSaldoPanel';

function DetailAgenTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Paper className="flex flex-col flex-auto overflow-auto items-center w-full" elevation={5}>
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
      <SwipeableViews axis="x" index={value} onChangeIndex={handleChangeIndex} className="flex flex-col w-full">
        <TransaksiSaldoPanel index={0} value={value} />
        <TransaksiPaketPanel index={1} value={value} />
      </SwipeableViews>
    </Paper>
  );
}

export default DetailAgenTabs;
