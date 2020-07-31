import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import moment from 'moment';
import {
  Button,
  CircularProgress,
  Dialog,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thousandSeparator } from 'app/Utils';
import { startCase } from 'lodash';
import {
  closeListTransaksiPaketAgenDialog,
  getListTransaksiPaketAgen,
  openTransaksiPaketAgenDialog,
  refreshListTransaksiPaketAgen,
  setTransaksiPaketAgenForm
} from './store/actions';
import reducer from './store/reducers';

function TransaksiPaketAgenList() {
  const dispatch = useDispatch();
  const { isRefresh, data, isLoading, props } = useSelector(({ transaksiPaketAgen }) => transaksiPaketAgen.list);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { data: dataPaket } = useSelector(({ paketAgen }) => paketAgen.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh && agen) {
      dispatch(getListTransaksiPaketAgen({ agen: agen.id }));
    }
  }, [agen, dispatch, isRefresh]);

  React.useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const handleClose = () => {
    dispatch(closeListTransaksiPaketAgenDialog());
  };

  const onClickDetail = transaksi => {
    dispatch(setTransaksiPaketAgenForm(transaksi));
    dispatch(openTransaksiPaketAgenDialog());
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-8' }}
      {...props}
      onClose={handleClose}
      maxWidth="lg"
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
          <Toolbar className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <Typography variant="h6" color="inherit" className="w-full mt-12">
                History Transaksi Paket {agen?.diri?.nama?.lengkap}
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
            <div className="m-8 mr-0 w-full flex flex-wrap-reverse justify-between">
              <div className="flex flex-wrap items-center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>refresh</Icon>}
                  onClick={() => dispatch(refreshListTransaksiPaketAgen())}
                >
                  Refresh
                </Button>
              </div>
            </div>

            <TableContainer component={Paper} elevation={2} className="my-12">
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold" style={{ width: '12rem' }}>
                      Tanggal
                    </TableCell>
                    <TableCell className="font-bold">Jenis</TableCell>
                    {dataPaket.length > 0 &&
                      dataPaket.map((paket, idx) => (
                        <TableCell key={idx} align="center" className="font-bold">
                          {paket.nama}
                        </TableCell>
                      ))}
                    <TableCell align="center" className="font-bold">
                      Total Paket
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows?.length > 0 ? (
                    rows.map(transaksi => {
                      let totalPaket = 0;

                      return (
                        <TableRow key={transaksi.id}>
                          <TableCell>{transaksi.tgl ? moment(transaksi.tgl).format('DD-MM-YYYY') : '-'}</TableCell>
                          <TableCell>{startCase(transaksi.jenis)}</TableCell>
                          {dataPaket.length > 0 &&
                            dataPaket.map((paket, idx) => {
                              const paketSelected = transaksi.items?.find(item => item.paket === paket.id);
                              totalPaket += paketSelected?.jumlah || 0;
                              return (
                                <TableCell key={idx} align="center">
                                  {thousandSeparator(paketSelected?.jumlah || 0)}
                                </TableCell>
                              );
                            })}
                          <TableCell align="center" style={{ width: '14.5rem' }}>
                            <Typography
                              className="text-blue hover:underline cursor-pointer"
                              onClick={() => onClickDetail(transaksi)}
                            >
                              {thousandSeparator(totalPaket)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3 + dataPaket.length} align="center">
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

export default withReducer('transaksiPaketAgen', reducer)(TransaksiPaketAgenList);
