import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import { closeKartuPaketDialog, saveKartuPaket } from './store/actions/form.actions';

function KartuPaketDialog() {
  const dispatch = useDispatch();
  const { isLoading, props, data } = useSelector(({ kartuPaket }) => kartuPaket.form);
  const [nama, setNama] = React.useState('');

  React.useEffect(() => {
    if (data) {
      setNama(data.nama);
    }
  }, [data]);

  const handleClose = () => {
    dispatch(closeKartuPaketDialog());
  };

  const onUpdate = () => {
    dispatch(
      saveKartuPaket({
        ...data,
        nama
      })
    );
  };

  return (
    <Dialog open={props.open} onClose={handleClose} disableBackdropClick disableEscapeKeyDown>
      <DialogTitle id="form-dialog-title">Merubah Nama Kartu Paket</DialogTitle>
      {isLoading ? (
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      ) : (
        <>
          <DialogContent>
            <DialogContentText>Merubah nama kartu paket hanya untuk memperbaiki penulisan typo saja</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nama"
              label="Nama Kartu Paket"
              onChange={evt => setNama(evt.target.value)}
              value={nama || ''}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Batal
            </Button>
            <Button onClick={onUpdate} color="primary">
              Perbaharui
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default KartuPaketDialog;
