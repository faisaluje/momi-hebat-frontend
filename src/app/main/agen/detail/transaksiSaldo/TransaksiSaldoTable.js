import React from 'react';
import _ from '@lodash';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredArray } from 'app/Utils';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  Tooltip,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import JenisTransaksi from 'app/main/components/JenisTransaksi';
import { openDialog, closeDialog } from 'app/store/actions';
import {
  getListTransaksiSaldo,
  setTransaksiSaldoForm,
  openTransaksiSaldoDialog,
  deleteTransaksiSaldo
} from './store/actions';
import TransaksiSaldoKategori from './TransaksiSaldoKategori';
import { setSaldoAgen } from '../store/actions';

function TransaksiSaldoTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, txtCari } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh && agen) {
      dispatch(getListTransaksiSaldo(agen.id));
      dispatch(setSaldoAgen(agen.id));
    }
  }, [agen, dispatch, isRefresh]);

  React.useEffect(() => {
    if (data) {
      const filtered = getFilteredArray(data, txtCari);

      setRows(_.orderBy(filtered, ['tgl', 'createdAt'], ['desc', 'desc']));
    }
  }, [data, txtCari]);

  const onClickDetail = transaksi => {
    dispatch(setTransaksiSaldoForm(transaksi));
    dispatch(openTransaksiSaldoDialog(TransaksiSaldoKategori.TRANSAKSI_LAIN));
  };

  const handleDeleteTransaksiSaldo = transaksi => {
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
    dispatch(deleteTransaksiSaldo(transaksi.id));
    dispatch(closeDialog());
  };

  return (
    <TableContainer component={Paper} className="mt-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tanggal</TableCell>
            <TableCell>Kategori</TableCell>
            <TableCell>Via</TableCell>
            <TableCell>Catatan</TableCell>
            <TableCell>Masuk</TableCell>
            <TableCell>Keluar</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map(transaksi => (
              <TableRow key={transaksi.id}>
                <TableCell>{moment(transaksi.tgl).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{_.startCase(transaksi.kategori)}</TableCell>
                <TableCell>{_.startCase(transaksi?.via)}</TableCell>
                <TableCell>{transaksi?.catatan}</TableCell>
                <TableCell>
                  {transaksi.jenis === JenisTransaksi.MASUK && (
                    <NumberFormat
                      decimalSeparator=","
                      value={transaksi.nominal}
                      displayType="text"
                      thousandSeparator="."
                      role="button"
                      className="text-blue hover:underline font-bold"
                      onClick={() => onClickDetail(transaksi)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {transaksi.jenis === JenisTransaksi.KELUAR && (
                    <NumberFormat
                      decimalSeparator=","
                      value={transaksi.nominal}
                      displayType="text"
                      thousandSeparator="."
                      role="button"
                      className="text-blue hover:underline font-bold"
                      onClick={() => onClickDetail(transaksi)}
                    />
                  )}
                </TableCell>
                <TableCell className="w-24">
                  {![TransaksiSaldoKategori.CASHBACK, TransaksiSaldoKategori.PAKET].includes(transaksi.kategori) && (
                    <Tooltip title="Hapus Transaksi" placement="left">
                      <IconButton size="small" onClick={() => handleDeleteTransaksiSaldo(transaksi)}>
                        <Icon className="text-red">close</Icon>
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Belum ada Transaksi. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransaksiSaldoTable;
