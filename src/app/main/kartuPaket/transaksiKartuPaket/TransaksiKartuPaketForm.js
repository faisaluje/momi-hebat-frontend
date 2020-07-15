import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import JenisTransaksi from 'app/main/components/JenisTransaksi';
import KartuPaketAutoComplete from 'app/main/components/KartuPaketAutoComplete';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import KartuPaketService from '../services/kartuPaket.service';
import { createTransaksiKartuPaket, setTransaksiKartuPaketForm } from '../store/actions';

const itemState = {
  kartuPaket: null,
  jumlah: ''
};

const defaultTransaksiKartuPaketState = {
  tgl: new Date(),
  jenis: JenisTransaksi.MASUK,
  items: [{ ...itemState }]
};

function TransaksiKartuPaketForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading } = useSelector(({ kartuPaket }) => kartuPaket.transaksi.form);
  const { form, setForm, setInForm, handleChange } = useForm(defaultTransaksiKartuPaketState);
  const [listKartuPaket, setListKartuPaket] = React.useState(null);
  const [isLoadingKartuPaket, setIsLoadingKartuPaket] = React.useState(true);
  const canBeSubmitted = !!form?.tgl && form?.items?.length > 0;

  React.useEffect(() => {
    if (!listKartuPaket) {
      setIsLoadingKartuPaket(true);
      KartuPaketService.getListKartuPaketData()
        .then(result => setListKartuPaket(result.data || []))
        .finally(() => setIsLoadingKartuPaket(false));
    }
  }, [listKartuPaket]);

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

  const addKartuPaket = () => {
    setForm({
      ...form,
      items: [...form.items, { ...itemState }]
    });
  };

  const removeKartuPaket = idx => {
    const newItems = form.items.filter((_item, index) => idx !== index);
    setForm({ ...form, items: newItems });
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
    dispatch(setTransaksiKartuPaketForm(form));
    dispatch(createTransaksiKartuPaket({ ...form }));
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
            <Typography className="min-w-160 font-bold pt-12">Tgl Transaksi:</Typography>

            <KeyboardDatePicker
              autoOk
              variant="inline"
              invalidDateMessage="Tanggal tidak valid"
              format="DD-MM-YYYY"
              value={form.tgl}
              onChange={date => setInForm('tgl', date?.toDate() || null)}
              readOnly={!!data?.id}
              InputProps={{
                readOnly: !!data?.id
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row mb-16 w-full">
            <Typography className="min-w-160 font-bold pt-12">Catatan:</Typography>

            <TextField
              variant="outlined"
              placeholder="ketik disini. . ."
              style={{ width: '45%' }}
              name="catatan"
              multiline
              rows={3}
              onChange={handleChange}
              value={form?.catatan || ''}
            />
          </div>

          <div className="flex mb-16">
            <Button
              variant="contained"
              size="small"
              className="capitalize"
              onClick={addKartuPaket}
              startIcon={<Icon>add_circle_outline</Icon>}
            >
              Tambah Kartu Paket
            </Button>
          </div>

          {form?.items?.map((item, idx) => (
            <div className="flex mb-16" key={idx}>
              <KartuPaketAutoComplete
                id={`kartupaket-autocomplete-${idx}`}
                style={{ width: '25rem' }}
                label="Nama Kartu Paket"
                data={listKartuPaket || []}
                value={item.kartuPaket}
                required
                loading={isLoadingKartuPaket}
                onChange={(_event, newValue) => {
                  if (newValue) {
                    if (newValue.inputValue) {
                      setInForm(`items[${idx}].kartuPaket`, { nama: newValue.inputValue });
                    }

                    if (newValue.id) {
                      setInForm(`items[${idx}].kartuPaket`, newValue);
                    }
                  } else {
                    setInForm(`items[${idx}].kartuPaket`, null);
                  }
                }}
              />

              <NumberFormat
                id={`jumlah-kartupaket-${idx}`}
                label="Qty"
                className="mx-0 sm:mx-20"
                value={item.jumlah || ''}
                onValueChange={val => setInForm(`items[${idx}].jumlah`, val.value)}
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                required
              />

              <IconButton onClick={() => removeKartuPaket(idx)}>
                <Icon className="text-red">delete_outline</Icon>
              </IconButton>
            </div>
          ))}
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

export default TransaksiKartuPaketForm;
