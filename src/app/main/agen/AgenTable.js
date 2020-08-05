/* eslint-disable radix */
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
import { closeDialog, openDialog } from 'app/store/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GreenSwitch from '../components/GreenSwitch';
import AgenStatus from './AgenStatus';
import { getListAgen, saveAgen, setLevelAgen, setListAgenPage, setTglLahirAgen, setTxtCariAgen } from './store/actions';
import SubAgenDialog from './SubAgenDialog';
import AgenActionsDialog from './AgenActionsDialog';

function AgenTable() {
  const dispatch = useDispatch();
  const { isRefresh, data, txtCari, status, level, page, tglLahir } = useSelector(({ agen }) => agen.table);
  const [rows, setRows] = React.useState([]);
  const [openSubAgens, setOpenSubAgens] = React.useState(false);
  const [openAgenActions, setOpenAgenActions] = React.useState(false);
  const [agenSelected, setAgenSelected] = React.useState(null);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListAgen({ status, nama: txtCari, level, page, detail: 1, tglLahir }));
    }
  }, [dispatch, isRefresh, level, page, status, tglLahir, txtCari]);

  React.useEffect(() => {
    if (data) {
      setRows(data.docs || []);
    }
  }, [data]);

  const onClickAgen = agen => {
    setAgenSelected(agen);
    setOpenAgenActions(true);
  };

  const handleChangeStatus = agen => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Agen {agen.diri.nama.lengkap} akan{' '}
                {agen.status === AgenStatus.aktif.value ? 'dinonaktifkan' : 'aktifkan'} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onChangeStatus(agen)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onChangeStatus = agen => {
    dispatch(
      saveAgen({
        ...agen,
        status: agen.status === AgenStatus.aktif.value ? AgenStatus.tidak_aktif.value : AgenStatus.aktif.value
      })
    );
    dispatch(closeDialog());
  };

  const onClickSubAgens = agen => {
    setAgenSelected(agen);
    setOpenSubAgens(true);
  };

  const onSubAgenSelected = subAgen => {
    dispatch(setLevelAgen(''));
    dispatch(setListAgenPage(1));
    dispatch(setTglLahirAgen(null));
    dispatch(setTxtCariAgen(subAgen.diri?.nama?.lengkap));
  };

  return (
    <>
      <SubAgenDialog
        open={openSubAgens}
        onClose={() => setOpenSubAgens(false)}
        agen={agenSelected}
        onSelected={onSubAgenSelected}
      />
      <AgenActionsDialog open={openAgenActions} onClose={() => setOpenAgenActions(false)} agen={agenSelected} />
      <TableContainer component={Paper} elevation={8} className="mt-12">
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {/* <TableCell className="w-12">No.</TableCell> */}
              <TableCell>No. Agen</TableCell>
              <TableCell>Nama Agen</TableCell>
              <TableCell>No. Tlp</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Kabupaten / Kota</TableCell>
              <TableCell>Level Agen</TableCell>
              <TableCell>Agen Referral</TableCell>
              <TableCell>Sub Agen</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 ? (
              rows.map(agen => (
                <TableRow key={agen.id}>
                  {/* <TableCell>{idx + 1}</TableCell> */}
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
                  <TableCell>{agen.diri.noTlp}</TableCell>
                  <TableCell>{agen.diri.alamat?.jalan}</TableCell>
                  <TableCell>{agen.diri.alamat?.kabKota}</TableCell>
                  <TableCell>{agen.level}</TableCell>
                  <TableCell>
                    {agen.topAgen?.no || ''} - {agen.topAgen?.diri?.nama?.lengkap || ''}
                  </TableCell>
                  <TableCell>
                    {agen.subAgens?.length > 0 ? (
                      <Typography
                        className="text-blue hover:underline font-bold text-14"
                        role="button"
                        onClick={() => onClickSubAgens(agen)}
                      >
                        {agen.subAgens.length} Agen
                      </Typography>
                    ) : (
                      ''
                    )}
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <GreenSwitch checked={agen.status === 'aktif'} onChange={() => handleChangeStatus(agen)} />
                      }
                      label={AgenStatus[agen.status].label}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Belum ada Agen. . .
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AgenTable;
