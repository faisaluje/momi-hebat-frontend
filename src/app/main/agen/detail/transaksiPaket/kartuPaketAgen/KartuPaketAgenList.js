import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import moment from 'moment';
import { closeDialog, openDialog } from 'app/store/actions';
import withReducer from 'app/store/withReducer';
import { orderBy, sumBy } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thousandSeparator } from 'app/Utils';
import KartuPaketAgenDialog from './KartuPaketAgenDialog';
import {
  closeListKartuPaketAgenDialog,
  deleteTransaksiKartuPaketAgen,
  getListKartuPaketAgen,
  openTransaksiKartuPaketAgenDialog,
  refreshListKartuPaketAgen
} from './store/actions';
import reducer from './store/reducers';

function KartuPaketAgenList() {
  const dispatch = useDispatch();
  const { isRefresh, data, isLoading, props } = useSelector(({ kartuPaketAgen }) => kartuPaketAgen.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const [rows, setRows] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh && agen) {
      dispatch(getListKartuPaketAgen(agen.id));
    }
  }, [agen, dispatch, isRefresh]);

  React.useEffect(() => {
    if (data) {
      setHeaders(data.listKartuPaket);
      setRows(orderBy(data.listKartuPaketAgen, ['tgl']));
    }
  }, [data]);

  const handleDeleteKartuPaketAgen = kartuPaket => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Kartu paket akan dihapus ?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onDeleteKartuPaket(kartuPaket)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onDeleteKartuPaket = kartuPaket => {
    dispatch(deleteTransaksiKartuPaketAgen(kartuPaket.id, agen.id));
    dispatch(closeDialog());
  };

  const handleClose = () => {
    dispatch(closeListKartuPaketAgenDialog());
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-8 w-full' }}
      {...props}
      onClose={handleClose}
      maxWidth="md"
      disableBackdropClick
      disableEscapeKeyDown
    >
      {isLoading ? (
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      ) : (
        <>
          <KartuPaketAgenDialog />
          <Toolbar className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <Typography variant="h6" color="inherit" className="w-full mt-12">
                Atur Kartu Paket {agen?.diri?.nama?.lengkap}
              </Typography>

              <IconButton className="absolute right-0" color="inherit" onClick={handleClose}>
                <Icon className="text-28">close</Icon>
              </IconButton>
            </div>
          </Toolbar>

          <FuseAnimateGroup
            enter={{
              animation: 'transition.slideDownIn',
              delay: 200,
              duration: 500
            }}
            className="flex flex-col flex-auto overflow-auto items-center p-24"
          >
            <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
              <div className="flex flex-wrap items-center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>refresh</Icon>}
                  onClick={() => dispatch(refreshListKartuPaketAgen())}
                >
                  Refresh
                </Button>
              </div>

              <div className="flex flex-wrap items-center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>arrow_upward</Icon>}
                  className="ml-24"
                  onClick={() => dispatch(openTransaksiKartuPaketAgenDialog('keluar'))}
                >
                  Pengambilan
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>arrow_downward</Icon>}
                  className="ml-24"
                  onClick={() => dispatch(openTransaksiKartuPaketAgenDialog('masuk'))}
                >
                  Pengembalian
                </Button>
              </div>
            </div>

            <TableContainer component={Paper} elevation={2} className="my-12">
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '12rem' }}>Tanggal</TableCell>
                    <TableCell>Status</TableCell>
                    {headers.length > 0 &&
                      headers.map((kartuPaket, idx) => (
                        <TableCell key={idx} align="center">
                          <Typography>{kartuPaket.nama}</Typography>
                        </TableCell>
                      ))}
                    <TableCell align="center"> </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length > 0 ? (
                    rows.map(transaksi => {
                      return (
                        <TableRow key={transaksi.id}>
                          <TableCell>{transaksi.tgl ? moment(transaksi.tgl).format('DD-MM-YYYY') : '-'}</TableCell>
                          <TableCell>{transaksi.jenis === 'masuk' ? 'Pengembalian' : 'Pengambilan'}</TableCell>
                          {headers.map(kartuPaket => {
                            const kartuPaketSelected = transaksi.items.filter(
                              item => item.kartuPaket.id === kartuPaket.id
                            );
                            const jumlahKartuPaketSelected = sumBy(kartuPaketSelected, 'jumlah');

                            return (
                              <TableCell key={kartuPaket.id} align="center">
                                {transaksi.jenis === 'masuk' && !!jumlahKartuPaketSelected && '-'}{' '}
                                {jumlahKartuPaketSelected ? thousandSeparator(jumlahKartuPaketSelected) : '-'}
                              </TableCell>
                            );
                          })}
                          <TableCell align="center">
                            <Tooltip title="Hapus Transaksi" placement="left">
                              <IconButton size="small" onClick={() => handleDeleteKartuPaketAgen(transaksi)}>
                                <Icon className="text-red">close</Icon>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3 + headers.length} align="center">
                        Belum ada Kartu Paket. . .
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                {rows.length > 0 && (
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography className="font-bold">TOTAL :</Typography>
                      </TableCell>

                      {headers.map(kartuPaket => {
                        const stokSelected = agen.stok?.kartuPakets?.find(item => item.kartuPaket === kartuPaket.id);

                        return (
                          <TableCell key={kartuPaket.id} align="center">
                            <Typography className="font-bold">
                              {stokSelected?.jumlah ? thousandSeparator(stokSelected.jumlah) : '-'}
                            </Typography>
                          </TableCell>
                        );
                      })}

                      <TableCell className="font-bold text-14">
                        {agen.stok?.kartuPakets?.length > 0
                          ? thousandSeparator(sumBy(agen.stok?.kartuPakets, 'jumlah')) || ''
                          : ''}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </TableContainer>
          </FuseAnimateGroup>
        </>
      )}
    </Dialog>
  );
}

export default withReducer('kartuPaketAgen', reducer)(KartuPaketAgenList);
