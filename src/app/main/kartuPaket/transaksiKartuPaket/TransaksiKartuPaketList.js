import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  CircularProgress,
  Typography,
  Toolbar,
  IconButton,
  Icon,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { getFilteredArray, thousandSeparator } from 'app/Utils';
import NumberFormat from 'react-number-format';
import { startCase, sumBy } from 'lodash';
import { closeDialog, openDialog } from 'app/store/actions';
import { Pagination } from '@material-ui/lab';
import { URL_API } from 'app/Constants';
import {
  closeListTransaksiKartuPaketDialog,
  deleteTransaksiKartuPaket,
  getListTransaksiKartuPaket,
  refreshListTransaksiKartuPaket,
  setListTransaksiKartuPaketPage,
  setTxtCariTransaksiKartuPaket
} from '../store/actions';
import TransaksiKartuPaketPrint from './TransaksiKartuPaketPrint';

function TransaksiKartuPaketList() {
  const dispatch = useDispatch();
  const { isRefresh, data, isLoading, props, txtCari, periodeId, page } = useSelector(
    ({ kartuPaket }) => kartuPaket.transaksi
  );
  const [rows, setRows] = React.useState([]);
  const [openCetak, setOpenCetak] = React.useState(false);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListTransaksiKartuPaket({ periode: periodeId, page }));
    }
  }, [dispatch, isRefresh, page, periodeId]);

  React.useEffect(() => {
    if (data) {
      const filtered = getFilteredArray(data.docs, txtCari);

      setRows(filtered);
    }
  }, [data, txtCari]);

  const handleClose = () => {
    dispatch(closeListTransaksiKartuPaketDialog());
  };

  const handleDeleteTransaksiKartuPaket = transaksi => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Transaksi akan dihapus ?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onDeleteTranaksi(transaksi)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onDeleteTranaksi = transaksi => {
    dispatch(deleteTransaksiKartuPaket(transaksi.id));
    dispatch(closeDialog());
  };

  const onCetakTransaksi = id => {
    window.open(`${URL_API}/output/transaksi-kartu-paket/${id}`);
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-8 w-full' }}
      {...props}
      onClose={handleClose}
      maxWidth="md"
      disableBackdropClick
      disableEscapeKeyDown
      BackdropProps={{
        className: 'print:hidden'
      }}
    >
      {isLoading ? (
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      ) : (
        <>
          <TransaksiKartuPaketPrint open={openCetak} onClose={() => setOpenCetak(false)} />
          <Toolbar className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <Typography variant="h6" color="inherit" className="w-full mt-12">
                Daftar Transaksi
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
            className="flex flex-col flex-auto overflow-auto items-center p-24 print:hidden"
          >
            <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
              <div className="flex flex-wrap items-center">
                <Typography className="mr-8">Cari : </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Ketik Disini..."
                  value={txtCari}
                  onChange={event => dispatch(setTxtCariTransaksiKartuPaket(event.target.value))}
                />
              </div>

              <div className="flex flex-wrap items-center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>refresh</Icon>}
                  className="ml-24"
                  onClick={() => dispatch(refreshListTransaksiKartuPaket())}
                >
                  Refresh
                </Button>
              </div>
            </div>

            <TableContainer component={Paper} elevation={2} className="my-12">
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '12rem' }}>Tanggal</TableCell>
                    <TableCell>No. Transaksi</TableCell>
                    <TableCell>Jenis Transaksi</TableCell>
                    <TableCell align="center">Total Kartu Paket</TableCell>
                    <TableCell>Catatan</TableCell>
                    <TableCell className="w-96"> </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length > 0 ? (
                    rows.map(transaksi => {
                      const totalKartuPaket = sumBy(transaksi.items, 'jumlah');

                      return (
                        <TableRow key={transaksi.id}>
                          <TableCell>{moment(transaksi.tgl).format('DD-MM-YYYY')}</TableCell>
                          <TableCell>{transaksi.no}</TableCell>
                          <TableCell>{startCase(transaksi.jenis)}</TableCell>
                          <TableCell align="center">
                            <Tooltip
                              title={
                                <>
                                  <table className="w-320">
                                    <thead>
                                      <tr>
                                        <th className="text-12" align="left">
                                          Nama Kartu Paket
                                        </th>
                                        <th className="text-12" align="left">
                                          Qty
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {transaksi?.items?.map((item, idx) => (
                                        <tr key={item.kartuPaket.id}>
                                          <td className="text-12">
                                            {idx + 1}. {item.kartuPaket.nama}
                                          </td>
                                          <td className="text-12 pr-24">
                                            {item.jumlah ? thousandSeparator(item.jumlah) : '-'}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </>
                              }
                              arrow
                              placement="left"
                            >
                              {totalKartuPaket ? (
                                <NumberFormat
                                  className="hover:underline text-blue cursor-pointer"
                                  decimalSeparator=","
                                  value={totalKartuPaket}
                                  displayType="text"
                                  thousandSeparator="."
                                />
                              ) : (
                                <Typography>-</Typography>
                              )}
                            </Tooltip>
                          </TableCell>
                          <TableCell>{transaksi.catatan}</TableCell>
                          <TableCell className="flex flex-row">
                            <Tooltip title="Cetak Transaksi" placement="left">
                              <IconButton size="small" onClick={() => onCetakTransaksi(transaksi.id)}>
                                <Icon>print</Icon>
                              </IconButton>
                            </Tooltip>

                            {!transaksi.agen && (
                              <>
                                <div className="mx-8" />
                                <Tooltip title="Hapus Transaksi" placement="left">
                                  <IconButton size="small" onClick={() => handleDeleteTransaksiKartuPaket(transaksi)}>
                                    <Icon className="text-red">close</Icon>
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Belum ada Transaksi. . .
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Paper elevation={3} className="flex flex-wrap mt-10 p-8 justify-center w-full">
              <div className="mt-12 sm:mt-0">
                {data?.totalPages && (
                  <Pagination
                    count={data.totalPages}
                    page={page}
                    onChange={(_evt, value) => dispatch(setListTransaksiKartuPaketPage(value))}
                    showFirstButton
                    showLastButton
                  />
                )}
              </div>
            </Paper>
          </FuseAnimateGroup>
        </>
      )}
    </Dialog>
  );
}

export default TransaksiKartuPaketList;
