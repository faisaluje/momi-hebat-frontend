import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Paper,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AgenStatus from 'app/main/agen/AgenStatus';
import GreenSwitch from 'app/main/components/GreenSwitch';
import { closeDialog, openDialog } from 'app/store/actions';
import { thousandSeparator } from 'app/Utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListPilihanPaket,
  openPilihanPaketDialog,
  setPilihanPaketForm,
  updateStatusPilihanPaket
} from './store/actions';

function PilihanPaketList() {
  const dispatch = useDispatch();
  const { isLoading, isRefresh, data, status, isError, msg } = useSelector(({ pilihanPaket }) => pilihanPaket.list);
  const { data: dataPaket } = useSelector(({ paket }) => paket.table);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListPilihanPaket({ status }));
    }
  }, [dispatch, isRefresh, status]);

  const handleChangeStatus = pilihanPaket => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Pilihan paket {pilihanPaket.nama} akan di
                {pilihanPaket.status === AgenStatus.aktif.value ? ' nonaktifkan' : ' aktifkan'} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onChangeStatus(pilihanPaket)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onChangeStatus = pilihanPaket => {
    dispatch(
      updateStatusPilihanPaket({
        ...pilihanPaket,
        status: pilihanPaket.status === AgenStatus.aktif.value ? AgenStatus.tidak_aktif.value : AgenStatus.aktif.value
      })
    );
    dispatch(closeDialog());
  };

  const onClickPilihanPaket = pilihanPaket => {
    dispatch(setPilihanPaketForm(pilihanPaket));
    dispatch(openPilihanPaketDialog());
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center text-center items-center h-full p-16">
        <CircularProgress />
        <Typography className="mt-8">Sedang memproses. . .</Typography>
      </div>
    );
  }

  return (
    <FuseAnimateGroup
      enter={{
        animation: 'transition.whirlIn',
        delay: 200,
        duration: 500
      }}
      className="my-12 w-full"
    >
      {isError && (
        <div className="flex mb-16">
          <Paper className="w-full bg-red-500 p-8 text-white">{msg || 'Gagal menyimpan'}</Paper>
        </div>
      )}

      <div className="flex flex-row mb-16">
        <Typography className="font-bold w-400">Nama Pilihan Paket</Typography>
        <Typography className="font-bold w-160">Harga</Typography>
        <Typography className="font-bold w-160">Cashback</Typography>
        <Typography className="font-bold">Status</Typography>
      </div>

      {dataPaket?.length > 0 ? (
        dataPaket.map(paket => {
          const pilihanPaketByDasarPaket = data.filter(pilihanPaket => pilihanPaket.jenisPaket._id === paket.id);

          return (
            <ExpansionPanel elevation={5} defaultExpanded key={paket._id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="font-bold">{paket.nama}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="flex flex-col">
                {pilihanPaketByDasarPaket.length > 0 ? (
                  pilihanPaketByDasarPaket.map(pilihanPaket => (
                    <div key={pilihanPaket._id} className="flex flex-col sm:flex-row items-center">
                      <div className="w-384">
                        <Typography
                          className="text-blue hover:underline font-bold text-14"
                          role="button"
                          onClick={() => onClickPilihanPaket(pilihanPaket)}
                        >
                          - {pilihanPaket.nama}
                        </Typography>
                      </div>
                      <Typography className="w-160">Rp. {thousandSeparator(pilihanPaket.harga)}</Typography>
                      <Typography className="w-160">
                        {pilihanPaket.cashback ? `Rp. ${thousandSeparator(pilihanPaket.cashback)}` : '-'}
                      </Typography>
                      <Typography>
                        <FormControlLabel
                          control={
                            <GreenSwitch
                              checked={pilihanPaket.status === 'aktif'}
                              onChange={() => handleChangeStatus(pilihanPaket)}
                            />
                          }
                          label={AgenStatus[pilihanPaket.status].label}
                        />
                      </Typography>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col sm:flex-row justify-center">
                    <Typography>Pilihan paket belum ada. . .</Typography>
                  </div>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })
      ) : (
        <div className="flex mb-16">
          <Paper className="w-full p-8 text-white">Belum ada paket</Paper>
        </div>
      )}
    </FuseAnimateGroup>
  );
}

export default PilihanPaketList;
