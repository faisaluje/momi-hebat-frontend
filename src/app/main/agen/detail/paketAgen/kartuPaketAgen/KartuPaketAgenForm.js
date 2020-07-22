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
import { Alert } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import JenisTransaksi from 'app/main/components/JenisTransaksi';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
import { thousandSeparator } from 'app/Utils';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailAgen } from '../../store/actions';
import { createTransaksiKartuPaketAgen, setTransaksiKartuPaketAgenForm } from './store/actions';

const defaultTransaksiKartuPaketState = {
  tgl: new Date(),
  jenis: JenisTransaksi.KELUAR,
  items: []
};

function KartuPaketAgenForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading, jenis } = useSelector(({ kartuPaketAgen }) => kartuPaketAgen.form);
  const { data: dataTransaksiKartuPaketAgen } = useSelector(({ kartuPaketAgen }) => kartuPaketAgen.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { form, setForm, setInForm } = useForm(defaultTransaksiKartuPaketState);
  const [listKartuPaket, setListKartuPaket] = React.useState([]);
  const canBeSubmitted = !!form?.tgl && form?.items?.length > 0;
  // const [stokError, setStokError] = React.useState(false);
  const stokError = false;
  const words = jenis === 'masuk' ? 'Dikembalikan' : 'Diambil';

  React.useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data, setForm]);

  React.useEffect(() => {
    if (listKartuPaket?.length < 1 && dataTransaksiKartuPaketAgen?.listKartuPaket) {
      setListKartuPaket(dataTransaksiKartuPaketAgen.listKartuPaket);
    }
  }, [dataTransaksiKartuPaketAgen, listKartuPaket]);

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
      dispatch(getDetailAgen(agen.id));
    }
  }, [agen.id, dispatch, isError, isLoading, msg]);

  const handleJumlahChange = (kartuPaket, jumlah) => {
    let itemSelected =
      form?.items.length > 0 ? form.items.find(item => item.kartuPaket?.id === kartuPaket.id) : undefined;

    if (!itemSelected) {
      itemSelected = { kartuPaket, jumlah };
      setForm({
        ...form,
        items: [...form.items, itemSelected]
      });
    } else {
      itemSelected.jumlah = jumlah;
    }
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
    dispatch(setTransaksiKartuPaketAgenForm(form));
    const newForm = {
      ...form,
      jenis,
      agen: agen.id,
      items: form.items.filter(item => !['0', ''].includes(item.jumlah)),
      catatan: `${words} Agen ${agen.diri.nama.lengkap}`
    };
    // if (newForm?.items?.length > 0) {
    //   if (newForm.items.find(item => item.kartuPaket.stok < item.jumlah)) {
    //     setStokError(true);
    //   } else {
    //     setStokError(false);
    //     dispatch(createTransaksiKartuPaketAgen(newForm));
    //   }
    // } else {
    //   setStokError(true);
    // }

    dispatch(createTransaksiKartuPaketAgen(newForm));
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

          <div className="flex mb-16">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Nama Kartu Paket</th>
                  <th>Stok Tersedia</th>
                  <th>Yang {words}</th>
                </tr>
              </thead>

              <tbody>
                {listKartuPaket.length > 0 &&
                  listKartuPaket.map(kartuPaket => {
                    const itemSelected =
                      form?.items?.length > 0
                        ? form?.items.find(item => item.kartuPaket?.id === kartuPaket.id)
                        : undefined;

                    let jumlahTersedia = kartuPaket.stok;
                    if (jenis === 'masuk') {
                      const stokSelected = agen.stok?.kartuPakets?.find(item => item.kartuPaket === kartuPaket.id);
                      jumlahTersedia = stokSelected?.jumlah || 0;
                    }

                    return (
                      <tr key={kartuPaket.id}>
                        <td>- {kartuPaket.nama}</td>
                        <td align="center">{thousandSeparator(jumlahTersedia)}</td>
                        <td align="center">
                          <NumberFormat
                            id={`jumlah-kartupaket-${kartuPaket.id}`}
                            className="mx-0 sm:mx-20 w-80"
                            value={itemSelected?.jumlah || ''}
                            onValueChange={val => handleJumlahChange(kartuPaket, val.value)}
                            customInput={TextField}
                            thousandSeparator="."
                            decimalSeparator=","
                            allowNegative={false}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </FuseAnimateGroup>
      </DialogContent>

      <DialogActions className="flex flex-row justify-between">
        {stokError && (
          <Alert variant="outlined" severity="error">
            Jumlah Yang {words} belum sesuai
          </Alert>
        )}
        <div className="mx-8" />
        <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
          Simpan
        </Button>
      </DialogActions>
    </form>
  );
}

export default KartuPaketAgenForm;
