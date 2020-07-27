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
import PaketAutoComplete from 'app/main/components/PaketAutoComplete';
import NumberFormat from 'react-number-format';
import ColorsPicker from 'app/main/components/ColorsPicker';
import { savePilihanPaket, setPilihanPaketForm } from './store/actions';

function PilihanPaketForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading } = useSelector(({ pilihanPaket }) => pilihanPaket.form);
  const { data: dataPaket } = useSelector(({ paket }) => paket.table);
  const { form, setForm, setInForm, handleChange } = useForm({});
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
    dispatch(setPilihanPaketForm(form));
    dispatch(savePilihanPaket({ ...form }));
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

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Paket Dasar:</Typography>

            <PaketAutoComplete
              style={{ width: '25rem' }}
              disabled={!!data?.id}
              data={dataPaket || []}
              value={form?.jenisPaket || null}
              required
              onChange={(_event, newValue) => {
                if (newValue?.id) {
                  setInForm('jenisPaket', newValue);
                  setInForm('nama', newValue.nama);
                } else {
                  setInForm('jenisPaket', null);
                }
              }}
            />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Nama Pilihan:</Typography>

            <TextField style={{ width: '25rem' }} name="nama" onChange={handleChange} value={form?.nama || ''} />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Harga:</Typography>

            <NumberFormat
              value={form?.harga || ''}
              onValueChange={val => setInForm('harga', val.value)}
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
              required
            />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Cashback:</Typography>

            <NumberFormat
              value={form?.cashback || ''}
              onValueChange={val => setInForm('cashback', val.value)}
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
            />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Warna Background:</Typography>

            <ColorsPicker
              className="w-76"
              color={form?.bgColor || '#FFF'}
              onChangeComplete={color => setInForm('bgColor', color.hex)}
            />
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

export default PilihanPaketForm;
