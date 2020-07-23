import React from 'react';
import { Button, Icon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openListKartuPaketAgenDialog } from './kartuPaketAgen/store/actions';
import { openBonusPaketDialog, refreshListPaketAgen } from './store/actions';
import { openListAturPaketAgenDialog } from './aturPaketAgen/store/actions';

function PaketAgenToolbar() {
  const dispatch = useDispatch();

  return (
    <>
      {/* <TransaksiSaldoDialog /> */}
      <div className="m-8 mr-0 flex flex-wrap justify-between w-full">
        <div className="flex flex-wrap items-center">
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>refresh</Icon>}
            onClick={() => dispatch(refreshListPaketAgen())}
          >
            Refresh
          </Button>

          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>payment</Icon>}
            className="ml-0 sm:ml-24"
            onClick={() => dispatch(openListKartuPaketAgenDialog())}
          >
            Atur Kartu Paket
          </Button>

          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>event_available</Icon>}
            className="ml-0 sm:ml-24"
            onClick={() => dispatch(openListAturPaketAgenDialog())}
          >
            Atur Ketersediaan
          </Button>

          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>money</Icon>}
            className="ml-0 sm:ml-24"
            onClick={() => dispatch(openBonusPaketDialog())}
          >
            Atur Bonus
          </Button>
        </div>

        <div className="flex flex-wrap items-center">
          <Button
            className="ml-0 sm:ml-12"
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>arrow_upward</Icon>}
            // onClick={() => dispatch(openTransaksiSaldoDialog(TransaksiSaldoKategori.SETORAN))}
          >
            Pengambilan
          </Button>

          <Button
            className="ml-0 sm:ml-12"
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Icon>arrow_downward</Icon>}
            // onClick={() => dispatch(openTransaksiSaldoDialog(TransaksiSaldoKategori.PENARIKAN))}
          >
            Pengembalian
          </Button>
        </div>
      </div>
    </>
  );
}

export default PaketAgenToolbar;
