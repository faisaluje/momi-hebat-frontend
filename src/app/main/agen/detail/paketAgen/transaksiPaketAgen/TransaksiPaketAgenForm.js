import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
import { thousandSeparator } from 'app/Utils';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaksiPaketAgen, setTransaksiPaketAgenForm } from './store/actions';

function TransaksiPaketAgenForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading, jenis } = useSelector(({ transaksiPaketAgen }) => transaksiPaketAgen.form);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { data: dataPaket } = useSelector(({ paketAgen }) => paketAgen.table);
  const { form, setForm, setInForm, handleChange } = useForm(null);
  const canBeSubmitted = !!form?.tgl && form?.items?.length > 0;
  const words = jenis === 'pengambilan' ? 'Diambil' : 'Dikembalikan';

  React.useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({
        tgl: new Date(),
        jenis: 'pengambilan',
        alamat: agen?.diri?.alamat?.jalan,
        items: []
      });
    }
  }, [agen, data, setForm]);

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

  const handleJumlahChange = (paket, jumlah) => {
    let itemSelected = form?.items.length > 0 ? form.items.find(item => item.paket === paket.id) : undefined;

    if (!itemSelected) {
      itemSelected = { paket: paket.id, jumlah };
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
    dispatch(setTransaksiPaketAgenForm(form));
    const newForm = {
      ...form,
      jenis,
      agen: agen.id
    };

    dispatch(createTransaksiPaketAgen(newForm));
    dispatch(closeDialog());
  };

  return (
    <>
      <Dialog classes={{ paper: 'rounded-8 p-24' }} open={isLoading} disableEscapeKeyDown disableBackdropClick>
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      </Dialog>

      <form onSubmit={handleSubmit} className="flex flex-col overflow-auto">
        <DialogContent classes={{ root: 'p-24' }}>
          <FuseAnimateGroup
            enter={{
              animation: 'transition.slideUpBigIn',
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
                value={form?.tgl || new Date()}
                onChange={date => setInForm('tgl', date?.toDate() || null)}
                readOnly={!!data?.id}
                InputProps={{
                  readOnly: !!data?.id
                }}
                autoFocus
                required
              />
            </div>

            {jenis === 'pengambilan' && (
              <div className="flex mb-16">
                <Typography className="min-w-160 font-bold pt-12">Alamat pengiriman:</Typography>

                <TextField
                  name="alamat"
                  value={form?.alamat}
                  rowsMax={3}
                  multiline
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !!data?.id
                  }}
                />
              </div>
            )}

            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Catatan:</Typography>

              <TextField
                name="catatan"
                value={form?.catatan}
                rowsMax={3}
                multiline
                fullWidth
                onChange={handleChange}
                InputProps={{
                  readOnly: !!data?.id
                }}
              />
            </div>

            <div className="flex mb-16">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Nama Paket</th>
                    <th>Stok Tersedia</th>
                    <th>Yang {words}</th>
                  </tr>
                </thead>

                <tbody>
                  {dataPaket?.length > 0 &&
                    dataPaket.map(paket => {
                      const itemSelected =
                        form?.items?.length > 0 ? form.items.find(item => item.paket === paket.id) : undefined;

                      let stokTersedia = 0;
                      const stokSelected = agen.stok?.pakets?.find(item => item.paket === paket.id);
                      if (jenis === 'pengambilan') {
                        stokTersedia = stokSelected?.stok || 0;
                      } else {
                        stokTersedia = (stokSelected?.jumlah || 0) - (stokSelected?.stok || 0);
                      }

                      return (
                        <tr key={paket.id}>
                          <td>- {paket.nama}</td>
                          <td align="center">{thousandSeparator(stokTersedia)}</td>
                          <td align="center">
                            <NumberFormat
                              id={`jumlah-paket-agen-${paket.id}`}
                              className="mx-0 sm:mx-20 w-80"
                              value={itemSelected?.jumlah || ''}
                              onValueChange={val => handleJumlahChange(paket, val.value)}
                              customInput={TextField}
                              thousandSeparator="."
                              decimalSeparator=","
                              allowNegative={false}
                              InputProps={{
                                readOnly: !!data?.id
                              }}
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

        {!data?.id && (
          <DialogActions className="flex flex-row justify-between">
            <div className="mx-8" />
            <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
              Simpan
            </Button>
          </DialogActions>
        )}
      </form>
    </>
  );
}

export default TransaksiPaketAgenForm;
