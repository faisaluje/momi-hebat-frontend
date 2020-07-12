import React from 'react';
import moment from 'moment';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import JenisTransaksi from 'app/main/components/JenisTransaksi';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
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
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { KeyboardDatePicker } from '@material-ui/pickers';
import BarangAutoComplete from 'app/main/components/BarangAutoComplete';
import NumberFormat from 'react-number-format';
import { createTransaksiBarang, setTransaksiBarangForm } from '../store/actions';
import BarangService from '../services/barang.service';

const itemState = {
  barang: null,
  jumlah: '',
  biaya: ''
};

const defaultTransaksiBarangState = {
  tgl: moment().format('YYYY-MM-DD'),
  jenis: JenisTransaksi.MASUK,
  items: [{ ...itemState }]
};

function TransaksiBarangForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading } = useSelector(({ barang }) => barang.transaksi.form);
  const { form, setForm, setInForm } = useForm(defaultTransaksiBarangState);
  const [listBarang, setListBarang] = React.useState(null);
  const [isLoadingBarang, setIsLoadingBarang] = React.useState(true);
  const canBeSubmitted = !!form?.tgl;

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
      setForm({ ...defaultTransaksiBarangState });
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

  const addBarang = () => {
    setForm({
      ...form,
      items: [...form.items, { ...itemState }]
    });
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
    dispatch(setTransaksiBarangForm(form));
    console.log(form);
    dispatch(createTransaksiBarang({ ...form }));
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

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Tgl Transaksi:</Typography>

            <KeyboardDatePicker
              autoOk
              variant="inline"
              invalidDateMessage="Tanggal tidak valid"
              format="DD/MM/YYYY"
              value={form.tgl}
              onChange={date => setInForm('tgl', date?.toDate() || null)}
              readOnly={!!data?.id}
              InputProps={{
                readOnly: !!data?.id
              }}
            />
          </div>

          <div className="flex mb-16">
            <Button variant="contained" size="small" className="capitalize" onClick={addBarang}>
              Tambah Barang
            </Button>
          </div>

          {form?.items?.map((item, idx) => (
            <div className="flex mb-16" key={idx}>
              <BarangAutoComplete
                id={`barang-autocomplete-${idx}`}
                style={{ width: '45rem' }}
                label="Nama Barang"
                data={listBarang || []}
                value={item.barang}
                loading={isLoadingBarang}
                onChange={(_event, newValue) => {
                  if (newValue.inputValue) {
                    setInForm(`items[${idx}].barang`, { nama: newValue.inputValue });
                  }

                  if (newValue.id) {
                    setInForm(`items[${idx}].barang`, newValue);
                  }
                }}
              />

              <NumberFormat
                id={`jumlah-barang-${idx}`}
                label="Qty"
                className="mx-0 sm:mx-20"
                value={item.jumlah || ''}
                onValueChange={val => setInForm(`items[${idx}].jumlah`, val.value)}
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                required
              />

              <NumberFormat
                id={`biaya-barang-${idx}`}
                label="Biaya"
                className="mx-0 sm:mx-20"
                value={item.biaya || ''}
                onValueChange={val => setInForm(`items[${idx}].biaya`, val.value)}
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                required
              />
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

export default TransaksiBarangForm;
