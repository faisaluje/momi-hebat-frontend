import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import AgenStatus from 'app/main/agen/AgenStatus';
import GreenSwitch from 'app/main/components/GreenSwitch';
import { closeDialog, openDialog } from 'app/store/actions';
import { getFilteredArray } from 'app/Utils';
import { orderBy, sumBy } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListKaryawan, openKaryawanDialog, saveKaryawan, setKaryawanForm } from './store/actions';

function KaryawanTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, status, txtCari } = useSelector(({ karyawan }) => karyawan.table);
  const { data: dataPacking } = useSelector(({ packing }) => packing.table);
  const [rows, setRows] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListKaryawan(status));
    }
  }, [dispatch, isRefresh, status]);

  React.useEffect(() => {
    if (data) {
      const filtered = getFilteredArray(data, txtCari);

      setRows(orderBy(filtered, ['no']));
    }
  }, [data, txtCari]);

  React.useEffect(() => {
    if (dataPacking?.listPaket) {
      setHeaders(dataPacking.listPaket);
    }
  }, [dataPacking]);

  const handleChangeStatus = karyawan => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Karyawan {karyawan.nama} akan di
                {karyawan.status === AgenStatus.aktif.value ? ' nonaktifkan' : ' aktifkan'} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onChangeStatus(karyawan)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onChangeStatus = karyawan => {
    dispatch(
      saveKaryawan({
        ...karyawan,
        status: karyawan.status === AgenStatus.aktif.value ? AgenStatus.tidak_aktif.value : AgenStatus.aktif.value
      })
    );
    dispatch(closeDialog());
  };

  const onClickKaryawan = karyawan => {
    dispatch(setKaryawanForm(karyawan));
    dispatch(openKaryawanDialog());
  };

  return (
    <TableContainer component={Paper} elevation={2} className="my-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5rem' }}>No.</TableCell>
            <TableCell>Nama Karyawan</TableCell>
            {headers.length > 0 &&
              headers.map((paket, idx) => (
                <TableCell key={idx} align="center">
                  {paket.nama}
                </TableCell>
              ))}
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map(karyawan => {
              let prosesKaryawan = [];

              if (dataPacking.listPacking) {
                dataPacking.listPacking.forEach(packing => {
                  const prosesSelected = packing.proses.filter(proses => proses.karyawan.id === karyawan.id);
                  if (prosesSelected.length > 0) {
                    prosesKaryawan = [...prosesKaryawan, ...prosesSelected];
                  }
                });
              }

              return (
                <TableRow key={karyawan.id}>
                  <TableCell>{karyawan.no}</TableCell>
                  <TableCell>
                    <Typography
                      className="text-blue hover:underline font-bold text-14"
                      role="button"
                      onClick={() => onClickKaryawan(karyawan)}
                    >
                      {karyawan.nama}
                    </Typography>
                  </TableCell>
                  {headers.length > 0 &&
                    headers.map((paket, idx) => {
                      const paketSelected = prosesKaryawan.filter(proses => proses.jenisPaket.id === paket.id);
                      const jumlahPaket = paketSelected.length > 0 ? sumBy(paketSelected, 'jumlah') : '-';

                      return (
                        <TableCell key={idx} align="center">
                          {jumlahPaket}
                        </TableCell>
                      );
                    })}
                  <TableCell>
                    <FormControlLabel
                      control={
                        <GreenSwitch
                          checked={karyawan.status === 'aktif'}
                          onChange={() => handleChangeStatus(karyawan)}
                        />
                      }
                      label={AgenStatus[karyawan.status].label}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Belum ada Karyawan. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default KaryawanTable;
