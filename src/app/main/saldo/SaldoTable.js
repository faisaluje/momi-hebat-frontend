import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import History from '@history';
import { sumBy } from 'lodash';
import { thousandSeparator } from 'app/Utils';
import { getListSaldo } from './store/actions';

function SaldoTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, txtCari, page } = useSelector(({ saldo }) => saldo.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListSaldo({ nama: txtCari, page, detail: 1 }));
    }
  }, [dispatch, isRefresh, page, txtCari]);

  React.useEffect(() => {
    if (data) {
      setRows(data?.docs);
    }
  }, [data]);

  const onClickAgen = agen => {
    History.push(`/agen/${agen.id}`);
  };

  return (
    <TableContainer component={Paper} elevation={8} className="my-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '11rem' }}>No. Agen</TableCell>
            <TableCell>Nama Agen</TableCell>
            <TableCell>Saldo</TableCell>
            <TableCell>Bonus</TableCell>
            <TableCell>Kartu Paket</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((agen, idx) => (
              <TableRow key={idx}>
                <TableCell>{agen.no}</TableCell>
                <TableCell>
                  <Typography
                    className="text-blue hover:underline font-bold text-14"
                    role="button"
                    onClick={() => onClickAgen(agen)}
                  >
                    {agen.diri.nama?.lengkap}
                  </Typography>
                </TableCell>
                <TableCell>
                  {agen.stok?.saldo ? (
                    <NumberFormat
                      prefix="Rp. "
                      decimalSeparator=","
                      value={agen.stok.saldo}
                      displayType="text"
                      thousandSeparator="."
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  {agen.stok?.totalBonus ? (
                    <NumberFormat
                      prefix="Rp. "
                      decimalSeparator=","
                      value={agen.stok.totalBonus}
                      displayType="text"
                      thousandSeparator="."
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  {agen.stok?.kartuPakets ? thousandSeparator(sumBy(agen.stok.kartuPakets, 'jumlah')) || '-' : '-'}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Belum ada Saldo Agen. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SaldoTable;
