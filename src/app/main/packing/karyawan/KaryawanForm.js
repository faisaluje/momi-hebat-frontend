import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveKaryawan, setKaryawanForm } from './store/actions';

function KaryawanForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading } = useSelector(({ karyawan }) => karyawan.form);
  const { form, setForm, handleChange } = useForm({});
  const canBeSubmitted = !!form?.nama;

  React.useEffect(() => {
    if (data) {
      setForm({ ...data });
    } else {
      setForm({});
    }
  }, [data, setForm]);

  React.useEffect(() => {
    if (!isLoading && !isError && msg) {
      dispatch(
        showMessage({
          message: msg, // text or html
          autoHideDuration: 6000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center' // left center right
          },
          variant: 'success' // success error info warning null
        })
      );
    }
  }, [dispatch, isError, isLoading, msg]);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Apakan anda sudah yakin ?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onSubmit()} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onSubmit = () => {
    dispatch(setKaryawanForm(form));
    dispatch(saveKaryawan({ ...form }));
    dispatch(closeDialog());
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
    <form onSubmit={handleSubmit} className="flex flex-col overflow-auto">
      <DialogContent classes={{ root: 'p-24' }}>
        <FuseAnimateGroup
          enter={{
            animation: 'transition.whirlIn',
            delay: 200,
            duration: 500
          }}
        >
          {isError && (
            <div className="flex mb-16">
              <Paper className="w-full bg-red-500 p-8 text-white">{msg || 'Gagal menyimpan'}</Paper>
            </div>
          )}

          {data?.id && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">No. Karyawan:</Typography>

              <TextField
                className="w-32"
                name="no"
                onChange={handleChange}
                value={form?.no || ''}
                InputProps={{ readOnly: true }}
              />
            </div>
          )}

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Nama Karyawan:</Typography>

            <TextField fullWidth name="nama" onChange={handleChange} value={form?.nama || ''} />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">No. HP:</Typography>

            <TextField fullWidth name="noHp" onChange={handleChange} value={form?.noHp || ''} />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Alamat:</Typography>

            <TextField fullWidth name="alamat" onChange={handleChange} value={form?.alamat || ''} multiline rows={3} />
          </div>
        </FuseAnimateGroup>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
          Simpan
        </Button>
      </DialogActions>
    </form>
  );
}

export default KaryawanForm;
