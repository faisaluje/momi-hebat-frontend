import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControlLabel,
  Tooltip,
  Typography
} from '@material-ui/core';
import { getFilteredArray } from 'app/Utils';
import NumberFormat from 'react-number-format';
import { closeDialog, openDialog } from 'app/store/actions';
import { getListPaket, openPaketDialog, savePaket, setPaketForm } from './store/actions';
import AgenStatus from '../agen/AgenStatus';
import GreenSwitch from '../components/GreenSwitch';

function PaketTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, txtCari, periodeId, status } = useSelector(({ paket }) => paket.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListPaket(status, periodeId));
    }
  }, [dispatch, isRefresh, periodeId, status]);

  React.useEffect(() => {
    if (data) {
      setRows(getFilteredArray(data, txtCari));
    }
  }, [data, txtCari]);

  const onClickPaket = paket => {
    dispatch(setPaketForm(paket));
    dispatch(openPaketDialog());
  };

  const handleChangeStatus = paket => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Paket {paket.nama} akan di {paket.status === AgenStatus.aktif.value ? 'nonaktifkan' : 'aktifkan'} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onChangeStatus(paket)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onChangeStatus = paket => {
    dispatch(
      savePaket({
        ...paket,
        status: paket.status === AgenStatus.aktif.value ? AgenStatus.tidak_aktif.value : AgenStatus.aktif.value
      })
    );
    dispatch(closeDialog());
  };

  return (
    <TableContainer component={Paper} elevation={8} className="my-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5rem' }}>No</TableCell>
            <TableCell>Nama Paket</TableCell>
            <TableCell>Biaya Packing</TableCell>
            <TableCell>Jumlah Barang</TableCell>
            <TableCell>Stok Tersedia</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((paket, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Typography className="text-blue hover:underline" role="button" onClick={() => onClickPaket(paket)}>
                    {paket.nama}
                  </Typography>
                </TableCell>
                <TableCell>
                  <NumberFormat
                    prefix="Rp. "
                    decimalSeparator=","
                    value={paket.biayaPacking}
                    displayType="text"
                    thousandSeparator="."
                  />
                </TableCell>
                <TableCell>
                  {paket.barangs?.length > 0 ? (
                    <Tooltip
                      title={
                        <>
                          <ul className="list-decimal min-w-96 pl-12">
                            {paket.barangs.map((barang, barangIdx) => (
                              <li key={barangIdx} className="text-12">
                                {barang.nama}
                              </li>
                            ))}
                          </ul>
                        </>
                      }
                      placement="left"
                      arrow
                    >
                      <Typography className="hover:underline text-blue cursor-pointer">
                        {paket.barangs.length} Barang
                      </Typography>
                    </Tooltip>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>Stok Tersedia</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <GreenSwitch checked={paket.status === 'aktif'} onChange={() => handleChangeStatus(paket)} />
                    }
                    label={AgenStatus[paket.status].label}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Belum ada Paket. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PaketTable;
