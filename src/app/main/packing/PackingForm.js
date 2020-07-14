import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
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
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { KeyboardDatePicker } from '@material-ui/pickers';
import NumberFormat from 'react-number-format';
import KaryawanService from './services/karyawan.service';
import PaketService from '../paket/services/paket.service';
import { savePacking, setPackingForm } from './store/actions';
import KaryawnAutoComplete from '../components/KaryawanAutoComplete';
import PaketAutoComplete from '../components/PaketAutoComplete';

const prosesState = {
  karyawan: null,
  jenisPaket: null,
  jumlah: 0
};

const defaultPackingState = {
  tgl: new Date(),
  proses: [{ ...prosesState }]
};

function PackingForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading } = useSelector(({ packing }) => packing.form);
  const { form, setForm, setInForm } = useForm(defaultPackingState);
  const [listKaryawan, setListKaryawan] = React.useState(null);
  const [isLoadingKaryawan, setIsLoadingKaryawan] = React.useState(true);
  const [listPaket, setListPaket] = React.useState(null);
  const [isLoadingPaket, setIsLoadingPaket] = React.useState(true);
  const canBeSubmitted = !!form?.tgl && form?.proses?.length > 0;

  React.useEffect(() => {
    if (!listKaryawan) {
      setIsLoadingKaryawan(true);
      KaryawanService.getListKaryawanData()
        .then(result => setListKaryawan(result.data || []))
        .finally(() => setIsLoadingKaryawan(false));
    }
  }, [listKaryawan]);

  React.useEffect(() => {
    if (!listPaket) {
      setIsLoadingPaket(true);
      PaketService.getListPaketData()
        .then(result => setListPaket(result.data || []))
        .finally(() => setIsLoadingPaket(false));
    }
  }, [listPaket]);

  React.useEffect(() => {
    if (data) {
      setForm({ ...data });
    } else {
      setForm({ ...defaultPackingState });
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

  const addProses = () => {
    setForm({
      ...form,
      proses: [...form.proses, { ...prosesState }]
    });
  };

  const removeProses = idx => {
    const newProses = form.proses.filter((_proses, index) => idx !== index);
    setForm({ ...form, proses: newProses });
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
    const dataForSave = { ...form };

    dataForSave.proses.forEach(proses => {
      proses.jenisPaket = proses.jenisPaket.id;
      proses.karyawan = proses.karyawan.id;
    });

    dispatch(setPackingForm(form));
    dispatch(savePacking(dataForSave));
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
            <Typography className="min-w-160 font-bold pt-12">Tanggal Packing:</Typography>

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

          {!data?.id && (
            <div className="flex mb-16">
              <Button
                variant="contained"
                size="small"
                className="capitalize"
                onClick={addProses}
                startIcon={<Icon>add_circle_outline</Icon>}
              >
                Tambah
              </Button>
            </div>
          )}

          {form?.proses?.map((proses, idx) => (
            <div className="flex mb-16" key={idx}>
              <KaryawnAutoComplete
                id={`karyawan-autocomplete-${idx}`}
                disabled={!!data?.id}
                style={{ width: '25rem' }}
                label="Nama Karyawan"
                data={listKaryawan || []}
                value={proses.karyawan}
                required
                loading={isLoadingKaryawan}
                onChange={(_event, newValue) => {
                  if (newValue) {
                    if (newValue.inputValue) {
                      setInForm(`proses[${idx}].karyawan`, { nama: newValue.inputValue });
                    }

                    if (newValue.id) {
                      setInForm(`proses[${idx}].karyawan`, newValue);
                    }
                  } else {
                    setInForm(`proses[${idx}].karyawan`, null);
                  }
                }}
              />

              <PaketAutoComplete
                id={`paket-autocomplete-${idx}`}
                style={{ width: '25rem', margin: '0 2rem 0 2rem' }}
                label="Nama Paket"
                disabled={!!data?.id}
                data={listPaket || []}
                value={proses.jenisPaket}
                required
                loading={isLoadingPaket}
                onChange={(_event, newValue) => {
                  if (newValue) {
                    if (newValue.inputValue) {
                      setInForm(`proses[${idx}].jenisPaket`, { nama: newValue.inputValue });
                    }

                    if (newValue.id) {
                      setInForm(`proses[${idx}].jenisPaket`, newValue);
                    }
                  } else {
                    setInForm(`proses[${idx}].jenisPaket`, null);
                  }
                }}
              />

              <NumberFormat
                id={`jumlah-paket-${idx}`}
                label="Qty"
                disabled={!!data?.id}
                className="mx-0 sm:mx-20"
                value={proses.jumlah || ''}
                onValueChange={val => setInForm(`proses[${idx}].jumlah`, val.value)}
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                required
              />

              {!data?.id && (
                <IconButton onClick={() => removeProses(idx)}>
                  <Icon className="text-red">delete_outline</Icon>
                </IconButton>
              )}
            </div>
          ))}
        </FuseAnimateGroup>
      </DialogContent>

      <DialogActions>
        {!data?.id && (
          <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
            Simpan
          </Button>
        )}
      </DialogActions>
    </form>
  );
}

export default PackingForm;
