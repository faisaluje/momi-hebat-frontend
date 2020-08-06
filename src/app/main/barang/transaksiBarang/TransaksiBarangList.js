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
import { getFilteredArray } from 'app/Utils';
import NumberFormat from 'react-number-format';
import { orderBy, startCase, sumBy } from 'lodash';
import { closeDialog, openDialog } from 'app/store/actions';
import {
  closeListTransaksiBarangDialog,
  getListTransaksiBarang,
  refreshListTransaksiBarang,
  setTxtCariTransaksiBarang,
  deleteTransaksiBarang,
  setTransaksiBarangForm
} from '../store/actions';
import TransaksiBarangPrint from './TransaksiBarangPrint';

function TransaksiBarangList() {
  const dispatch = useDispatch();
  const { isRefresh, data, isLoading, props, txtCari } = useSelector(({ barang }) => barang.transaksi);
  const [rows, setRows] = React.useState([]);
  const [openCetak, setOpenCetak] = React.useState(false);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListTransaksiBarang());
    }
  }, [dispatch, isRefresh]);

  React.useEffect(() => {
    if (data) {
      const filtered = getFilteredArray(data, txtCari);

      setRows(orderBy(filtered, ['tgl']));
    }
  }, [data, txtCari]);

  const handleClose = () => {
    dispatch(closeListTransaksiBarangDialog());
  };

  const handleDeleteTransaksiBarang = transaksi => {
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
    dispatch(deleteTransaksiBarang(transaksi.id));
    dispatch(closeDialog());
  };

  const onCetakTransaksi = transaksi => {
    dispatch(setTransaksiBarangForm(transaksi));
    setOpenCetak(true);
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
          <TransaksiBarangPrint open={openCetak} onClose={() => setOpenCetak(false)} />
          <Toolbar className="flex flex-row items-center justify-between w-full print:hidden">
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
                  onChange={event => dispatch(setTxtCariTransaksiBarang(event.target.value))}
                />
              </div>

              <div className="flex flex-wrap items-center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>refresh</Icon>}
                  className="ml-24"
                  onClick={() => dispatch(refreshListTransaksiBarang())}
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
                    <TableCell>Total Biaya</TableCell>
                    <TableCell>Catatan</TableCell>
                    <TableCell className="w-96"> </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length > 0 ? (
                    rows.map(transaksi => {
                      const totalBiaya = sumBy(transaksi.items, 'biaya');

                      return (
                        <TableRow key={transaksi.id}>
                          <TableCell>{moment(transaksi.tgl).format('DD-MM-YYYY')}</TableCell>
                          <TableCell>{transaksi.no}</TableCell>
                          <TableCell>{startCase(transaksi.jenis)}</TableCell>
                          <TableCell>
                            <Tooltip
                              title={
                                <>
                                  <table className="w-320">
                                    <thead>
                                      <tr>
                                        <th className="text-12" align="left">
                                          Nama Barang
                                        </th>
                                        <th className="text-12" align="left">
                                          Qty
                                        </th>
                                        <th className="text-12" align="left">
                                          Biaya
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {transaksi.items.map((item, idx) => (
                                        <tr key={item.barang.id}>
                                          <td className="text-12">
                                            {idx + 1}. {item.barang.nama}
                                          </td>
                                          <td className="text-12">{item.jumlah}</td>
                                          <td className="text-12">
                                            {item.biaya ? (
                                              <NumberFormat
                                                prefix="Rp. "
                                                decimalSeparator=","
                                                value={item.biaya || 0}
                                                displayType="text"
                                                thousandSeparator="."
                                              />
                                            ) : (
                                              '-'
                                            )}
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
                              {totalBiaya ? (
                                <NumberFormat
                                  className="hover:underline text-blue cursor-pointer"
                                  prefix="Rp. "
                                  decimalSeparator=","
                                  value={totalBiaya}
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
                              <IconButton size="small" onClick={() => onCetakTransaksi(transaksi)}>
                                <Icon>print</Icon>
                              </IconButton>
                            </Tooltip>

                            {transaksi.catatan !== 'Packing' && (
                              <>
                                <div className="mx-8" />
                                <Tooltip title="Hapus Transaksi" placement="left">
                                  <IconButton size="small" onClick={() => handleDeleteTransaksiBarang(transaksi)}>
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
          </FuseAnimateGroup>
        </>
      )}
    </Dialog>
  );
}

export default TransaksiBarangList;
