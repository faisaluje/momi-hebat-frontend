import React from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import TransaksiSaldoToolbar from './TransaksiSaldoToolbar';
import reducer from './store/reducers';
import TransaksiSaldoTable from './TransaksiSaldoTable';
import { getListTransaksiSaldoByAgen } from './store/actions';

function TransaksiSaldoPanel() {
  const dispatch = useDispatch();
  const { isLoading, isRefresh } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

  React.useEffect(() => {
    if (isRefresh && agen) {
      dispatch(getListTransaksiSaldoByAgen(agen.id));
    }
  }, [agen, dispatch, isRefresh]);

  return (
    <div className="flex flex-col overflow-auto p-12 items-center justify-center">
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
