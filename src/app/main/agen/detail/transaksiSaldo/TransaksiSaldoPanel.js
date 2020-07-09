import React from 'react';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import TransaksiSaldoToolbar from './TransaksiSaldoToolbar';
import reducer from './store/reducers';
import TransaksiSaldoTable from './TransaksiSaldoTable';

function TransaksiSaldoPanel() {
  const { isLoading } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);

  return (
    <div className="flex flex-col overflow-auto p-12">
      {isLoading ? (
        <>
          <CircularProgress color="secondary" />
          <Typography className="mt-8">Sedang memuat data. . .</Typography>
        </>
      ) : (
        <>
          <TransaksiSaldoToolbar />
          <TransaksiSaldoTable />
        </>
      )}
    </div>
  );
}

export default withReducer('transaksiSaldo', reducer)(TransaksiSaldoPanel);
