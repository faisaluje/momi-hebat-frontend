import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
  Button,
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
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import BarangService from '../barang/services/barang.service';
import BarangAutoComplete from '../components/BarangAutoComplete';
import { savePaket, setPaketForm } from './store/actions';

const defaultPaketState = {
  nama: '',
  biayaPacking: '',
  barangs: []
};

function PaketForm() {
  const dispatch = useDispatch();
  const { form, setForm, setInForm, handleChange } = useForm(defaultPaketState);
  const { data, isError, msg, isLoading } = useSelector(({ paket }) => paket.form);
  const [listBarang, setListBarang] = React.useState(null);
  const [isLoadingBarang, setIsLoadingBarang] = React.useState(true);
  const canBeSubmitted = !!form?.nama;

  React.useEffect(() => {
    if (!listBarang) {
      setIsLoadingBarang(true);
      BarangService.getListBarang()
        .then(result => setListBarang(result.data || []))
        .finally(() => setIsLoadingBarang(false));
    }
  }, [listBarang]);

  React.useEffect(() => {
    if (data) {
      setForm({ ...data });
    } else {
      setForm({ ...defaultPaketState });
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

  const onChangeBarang = (_event, value) => {
    if (value?.length > 0) {
      const newValue = value.map(barang => {
        if (barang.inputValue) {
          return { nama: barang.inputValue };
        }

        return barang;
      });

      return setInForm(
        'barangs',
        newValue.filter(barang => typeof barang !== 'string')
      );
    }

    return setInForm('barangs', value);
  };

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
    dispatch(setPaketForm(form));
    dispatch(savePaket({ ...form }));
    dispatch(closeDialog());
  };

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

          <div className="flex flex-col sm:flex-row mb-16 w-full items-center">
            <Typography className="min-w-160 font-bold pt-12">Nama Paket:</Typography>

            <TextField style={{ width: '45%' }} name="nama" onChange={handleChange} value={form?.nama || ''} required />
          </div>

          <div className="flex flex-col sm:flex-row mb-16 w-full items-center">
            <Typography className="min-w-160 font-bold pt-12">Biaya Packing:</Typography>

            <NumberFormat
              prefix="Rp. "
              value={form.biayaPacking || ''}
              onValueChange={val => setInForm('biayaPacking', val.value)}
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row mb-16 w-full items-center">
            <Typography className="min-w-160 font-bold pt-12">Barang:</Typography>

            <BarangAutoComplete
              multiple
              style={{ width: '100%' }}
              data={listBarang || []}
              value={form.barangs}
              loading={isLoadingBarang}
              onChange={onChangeBarang}
            />
          </div>

          <div className="flex flex-col sm:flex-row mb-16 w-full">
            <Typography className="min-w-160 font-bold pt-12">Keterangan:</Typography>

            <TextField
              variant="outlined"
              placeholder="ketik disini. . ."
              fullWidth
              name="keterangan"
              multiline
              rows={3}
              onChange={handleChange}
              value={form?.keterangan || ''}
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

export default PaketForm;
