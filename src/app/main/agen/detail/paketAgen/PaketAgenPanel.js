import React from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import PaketAgenToolbar from './PaketAgenToolbar';
import KartuPaketAgenList from './kartuPaketAgen/KartuPaketAgenList';
import reducer from './store/reducers';
import BonusPaketDialog from './bonusPaket/BonusPaketDialog';
import { getListPaketAgen } from './store/actions';
import PaketAgenTable from './PaketAgenTable';
import AturPaketAgenList from './aturPaketAgen/AturPaketAgenList';
import TransaksiPaketAgenList from './transaksiPaketAgen/TransaksiPaketAgenList';
import TransaksiPaketAgenDialog from './transaksiPaketAgen/TransaksiPaketAgenDialog';

function PaketAgenPanel() {
  const dispatch = useDispatch();
  const { isLoading, isRefresh } = useSelector(({ paketAgen }) => paketAgen.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

  React.useEffect(() => {
    if (isRefresh && agen) {
      dispatch(getListPaketAgen());
    }
  }, [agen, dispatch, isRefresh]);

  return (
    <div className="flex flex-col overflow-auto p-12 items-center justify-center">
      <KartuPaketAgenList />
      <BonusPaketDialog />
      <AturPaketAgenList />
      <TransaksiPaketAgenList />
      <TransaksiPaketAgenDialog />
      {isLoading ? (
        <>
          <CircularProgress color="secondary" />
          <Typography className="mt-8">Sedang memuat data. . .</Typography>
        </>
      ) : (
        <>
          <PaketAgenToolbar />
          <PaketAgenTable />
        </>
      )}
    </div>
  );
}

export default withReducer('paketAgen', reducer)(PaketAgenPanel);
