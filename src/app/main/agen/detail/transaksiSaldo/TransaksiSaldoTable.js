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
import { setTransaksiSaldoForm, openTransaksiSaldoDialog, deleteTransaksiSaldo } from './store/actions';
import TransaksiSaldoKategori from './TransaksiSaldoKategori';
import TransaksiSaldoPrint from './TransaksiSaldoPrint';

function TransaksiSaldoTable() {
  const dispatch = useDispatch();
  const { data, txtCari } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);
  const [rows, setRows] = React.useState([]);
  const [openCetak, setOpenCetak] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      const filtered = getFilteredArray(data, txtCari);

      setRows(filtered);
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

  const onCetakTransaksi = transaksi => {
    dispatch(setTransaksiSaldoForm(transaksi));
    setOpenCetak(true);
  };

  return (
    <TableContainer component={Paper} className="mt-12">
      <TransaksiSaldoPrint open={openCetak} onClose={() => setOpenCetak(false)} />
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '12rem' }}>Tanggal</TableCell>
            <TableCell>Kategori</TableCell>
            <TableCell>Via</TableCell>
            <TableCell>Catatan</TableCell>
            <TableCell style={{ minWidth: '14rem' }}>Masuk</TableCell>
            <TableCell style={{ minWidth: '14rem' }}>Keluar</TableCell>
            <TableCell className="w-96"> </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map(transaksi => (
              <TableRow key={transaksi.id}>
                <TableCell>{moment(transaksi.tgl).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{_.startCase(transaksi.kategori)}</TableCell>
                <TableCell>{_.startCase(transaksi?.via)}</TableCell>
                <TableCell>{transaksi?.catatan}</TableCell>
                <TableCell>
                  {transaksi.jenis === JenisTransaksi.MASUK && (
                    <NumberFormat
                      decimalSeparator=","
                      prefix="Rp. "
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
                      prefix="Rp. "
                      value={transaksi.nominal}
                      displayType="text"
                      thousandSeparator="."
                      role="button"
                      className="text-blue hover:underline font-bold"
                      onClick={() => onClickDetail(transaksi)}
                    />
                  )}
                </TableCell>
                <TableCell className="flex flex-row">
                  <Tooltip title="Cetak Transaksi" placement="left">
                    <IconButton size="small" onClick={() => onCetakTransaksi(transaksi)}>
                      <Icon>print</Icon>
                    </IconButton>
                  </Tooltip>

                  {![TransaksiSaldoKategori.CASHBACK, TransaksiSaldoKategori.PAKET].includes(transaksi.kategori) && (
                    <>
                      <div className="mx-8" />
                      <Tooltip title="Hapus Transaksi" placement="left">
                        <IconButton size="small" onClick={() => handleDeleteTransaksiSaldo(transaksi)}>
                          <Icon className="text-red">close</Icon>
                        </IconButton>
                      </Tooltip>
                    </>
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
