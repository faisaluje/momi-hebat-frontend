import React from 'react';
import _ from '@lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredArray } from 'app/Utils';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import JenisTransaksi from 'app/main/components/JenisTransaksi';
import { getListTransaksiSaldo } from './store/actions';

function TransaksiSaldoTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, txtCari } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh && agen) {
      dispatch(getListTransaksiSaldo(agen.id));
    }
  }, [agen, dispatch, isRefresh]);

  React.useEffect(() => {
    if (data) {
      const filtered = getFilteredArray(data, txtCari);

      setRows(filtered);
    }
  }, [data, txtCari]);

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
                <TableCell>{transaksi.jenis === JenisTransaksi.MASUK && transaksi.nominal}</TableCell>
                <TableCell>{transaksi.jenis === JenisTransaksi.KELUAR && transaksi.nominal}</TableCell>
              </TableRow>
            ))
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
  );
}

export default TransaksiSaldoTable;
