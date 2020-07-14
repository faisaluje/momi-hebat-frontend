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
  TableRow
} from '@material-ui/core';
import AgenStatus from 'app/main/agen/AgenStatus';
import GreenSwitch from 'app/main/components/GreenSwitch';
import { closeDialog, openDialog } from 'app/store/actions';
import { getFilteredArray } from 'app/Utils';
import { orderBy } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListKaryawan } from './store/actions';

function KaryawanTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, status, txtCari } = useSelector(({ karyawan }) => karyawan.table);
  const [rows, setRows] = React.useState([]);

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
    // dispatch(
    //   saveAgen({
    //     ...karyawan,
    //     status: karyawan.status === AgenStatus.aktif.value ? AgenStatus.tidak_aktif.value : AgenStatus.aktif.value
    //   })
    // );
    dispatch(closeDialog());
  };

  return (
    <TableContainer component={Paper} elevation={2} className="my-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5rem' }}>No.</TableCell>
            <TableCell>Nama Karyawan</TableCell>
            <TableCell>Paket</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map(karyawan => {
              return (
                <TableRow key={karyawan.id}>
                  <TableCell>{karyawan.no}</TableCell>
                  <TableCell>{karyawan.nama}</TableCell>
                  <TableCell>Paket</TableCell>
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
