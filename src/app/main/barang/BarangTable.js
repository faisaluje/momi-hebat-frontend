import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { getFilteredArray } from 'app/Utils';
import NumberFormat from 'react-number-format';
import { getListStokBarang } from './store/actions';

function BarangTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, txtCari, periodeId } = useSelector(({ barang }) => barang.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListStokBarang(periodeId));
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
            <TableCell>Nama Barang</TableCell>
            <TableCell>Jumlah Stok</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Typography>{item.barang?.nama || '-'}</Typography>
                </TableCell>
                <TableCell>
                  <NumberFormat decimalSeparator="," value={item.jumlah} displayType="text" thousandSeparator="." />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Belum ada Barang. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BarangTable;
