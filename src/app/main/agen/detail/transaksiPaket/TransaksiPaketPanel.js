import React from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import { getListTransaksiSaldo } from '../transaksiSaldo/store/actions';
import TransaksiPaketToolbar from './TransaksiPaketToolbar';
import KartuPaketAgenList from './kartuPaketAgen/KartuPaketAgenList';

function TransaksiPaketPanel() {
  const dispatch = useDispatch();
  const { isLoading, isRefresh } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

  React.useEffect(() => {
    if (isRefresh && agen) {
      dispatch(getListTransaksiSaldo(agen.id));
    }
  }, [agen, dispatch, isRefresh]);

  return (
    <div className="flex flex-col overflow-auto p-12 items-center justify-center">
      <KartuPaketAgenList />
      {isLoading ? (
        <>
          <CircularProgress color="secondary" />
          <Typography className="mt-8">Sedang memuat data. . .</Typography>
        </>
      ) : (
        <>
          <TransaksiPaketToolbar />
          {/* <TransaksiSaldoTable /> */}
        </>
      )}
    </div>
  );
}

// export default withReducer('transaksiSaldo', reducer)(TransaksiPaketPanel);
export default TransaksiPaketPanel;
