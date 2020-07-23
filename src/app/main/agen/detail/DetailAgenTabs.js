import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PaketAgenPanel from './paketAgen/PaketAgenPanel';
import TransaksiSaldoPanel from './transaksiSaldo/TransaksiSaldoPanel';
import { exitListTransaksiSaldo } from './transaksiSaldo/store/actions';
import { exitListKartuPaketAgen } from './paketAgen/kartuPaketAgen/store/actions';
import { exitListAturPaketAgen } from './paketAgen/aturPaketAgen/store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    textTransform: 'capitalize'
  },
  selected: {
    background: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.secondary.light),
    textTransform: 'uppercase'
  }
}));

function DetailAgenTabs(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    return () => {
      dispatch(exitListTransaksiSaldo());
      dispatch(exitListKartuPaketAgen());
      dispatch(exitListAturPaketAgen());
    };
  }, [dispatch]);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className="flex flex-col w-full" elevation={5} style={{ height: '75%' }}>
      <AppBar position="static" color="primary">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Saldo" classes={classes} />
          <Tab label="Paket" classes={classes} />
        </Tabs>
      </AppBar>
      {value === 0 && <TransaksiSaldoPanel />}
      {value === 1 && <PaketAgenPanel />}
    </Paper>
  );
}

export default DetailAgenTabs;
