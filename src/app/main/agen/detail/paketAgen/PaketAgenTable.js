import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

function PaketAgenTable() {
  const { data } = useSelector(({ paketAgen }) => paketAgen.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  return (
    <TableContainer component={Paper} className="mt-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5rem' }}>No.</TableCell>
            <TableCell>Nama Paket</TableCell>
            <TableCell align="center">Stok Tersedia</TableCell>
            <TableCell align="center">Stok Diambil</TableCell>
            <TableCell align="center">Stok Sisa</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows?.length > 0 ? (
            rows.map((paket, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell style={{ width: '5rem' }}>{idx + 1}.</TableCell>
                  <TableCell className="font-bold text-14">{paket.nama}</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Belum ada Paket. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PaketAgenTable;
