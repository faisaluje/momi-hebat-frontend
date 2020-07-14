import moment from 'moment';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import { getFilteredArray, thousandSeparator } from 'app/Utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sumBy } from 'lodash';
import { closeDialog, openDialog } from 'app/store/actions';
import { deletePacking, openPackingDialog, setPackingForm } from './store/actions';

function PackingTable() {
  const dispatch = useDispatch();
  const { data, txtCari } = useSelector(({ packing }) => packing.table);
  const [rows, setRows] = React.useState([]);
  const [header, setHeader] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      // setHeader(getFilteredArray(data.listPaket, txtCari));
      setHeader(data.listPaket);
      setRows(getFilteredArray(data.listPacking, txtCari));
    }
  }, [data, txtCari]);

  const handleDeletePacking = packing => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Packing akan dihapus ?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onDeletePacking(packing)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onDeletePacking = packing => {
    dispatch(deletePacking(packing.id));
    dispatch(closeDialog());
  };

  const onClickPacking = packing => {
    dispatch(setPackingForm(packing));
    dispatch(openPackingDialog());
  };

  return (
    <TableContainer component={Paper} elevation={5} className="my-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5rem' }}>No</TableCell>
            <TableCell>Tanggal Packing</TableCell>
            {header.length > 0 &&
              header.map((paket, idx) => (
                <TableCell key={idx} align="center">
                  <Typography>{paket.nama}</Typography>
                  <Typography variant="caption">Rp. {thousandSeparator(paket.biayaPacking)} / paket</Typography>
                </TableCell>
              ))}
            <TableCell align="center">Total Biaya</TableCell>
            <TableCell align="center"> </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((packing, idx) => {
              let totalBiaya = 0;

              return (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Typography
                      className="text-blue hover:underline font-bold text-14"
                      role="button"
                      onClick={() => onClickPacking(packing)}
                    >
                      {packing.tgl ? moment(packing.tgl).format('DD-MM-YYYY') : '-'}
                    </Typography>
                  </TableCell>
                  {header.map(paket => {
                    const paketSelected = packing.proses.filter(proses => proses.jenisPaket.id === paket.id);
                    const jumlahPaketSelected = sumBy(paketSelected, 'jumlah');
                    totalBiaya += jumlahPaketSelected * paket.biayaPacking;

                    return (
                      <TableCell key={paket.id} align="center">
                        {jumlahPaketSelected}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">Rp. {thousandSeparator(totalBiaya)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Hapus Packing" placement="left">
                      <IconButton size="small" onClick={() => handleDeletePacking(packing)}>
                        <Icon className="text-red">close</Icon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4 + header.length} align="center">
                Belum ada Packing. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PackingTable;
