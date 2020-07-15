import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { getFilteredArray, thousandSeparator } from 'app/Utils';
import { getListKartuPaket } from './store/actions';

function KartuPaketTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, txtCari, periodeId } = useSelector(({ kartuPaket }) => kartuPaket.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListKartuPaket(periodeId));
    }
  }, [dispatch, isRefresh, periodeId]);

  React.useEffect(() => {
    if (data) {
      setRows(getFilteredArray(data, txtCari));
    }
  }, [data, txtCari]);

  return (
    <TableContainer component={Paper} elevation={8} className="my-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5rem' }}>No</TableCell>
            <TableCell>Nama Kartu Paket</TableCell>
            <TableCell>Jumlah Stok Tersedia</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Typography>{item.nama || '-'}</Typography>
                </TableCell>
                <TableCell>{item.stok ? thousandSeparator(item.stok) : '-'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Belum ada Kartu Paket. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default KartuPaketTable;