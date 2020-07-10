import React from 'react';
import _ from '@lodash';
import moment from 'moment';
import 'moment/locale/id';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, openDialog, closeDialog } from 'app/store/actions';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
  Typography,
  TextField,
  MenuItem
} from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import JenisTransaksi from 'app/main/components/JenisTransaksi';
import NumberFormat from 'react-number-format';
import { KeyboardDatePicker } from '@material-ui/pickers';
import TransaksiSaldoKategori from './TransaksiSaldoKategori';
import TransaksiSaldoVia from './TransaksiSaldoVia';
import { createTransaksiSaldo, setTransaksiSaldoForm } from './store/actions';

moment.locale('id');

const defaultTransaksiSaldoState = {
  tgl: moment().format('YYYY-MM-DD'),
  jenis: JenisTransaksi.KELUAR,
  kategori: TransaksiSaldoKategori.TRANSAKSI_LAIN,
  nominal: 0
};

function TransaksiSaldoForm() {
  const dispatch = useDispatch();
  const { isError, msg, isLoading, data, kategori } = useSelector(({ transaksiSaldo }) => transaksiSaldo.form);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { form, setForm, setInForm, handleChange } = useForm(defaultTransaksiSaldoState);
  const canBeSubmitted = !!form?.nominal;

  React.useEffect(() => {
    if (data) {
      setForm({ ...data });
    } else {
      setForm({
        ...defaultTransaksiSaldoState,
        kategori,
        jenis: kategori === TransaksiSaldoKategori.SETORAN ? JenisTransaksi.MASUK : JenisTransaksi.KELUAR
      });
    }
  }, [data, kategori, setForm]);

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
    dispatch(setTransaksiSaldoForm(form));
    dispatch(createTransaksiSaldo({ ...form, agen }));
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

          {data?.id && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">No. Transaksi:</Typography>

              <TextField
                name="no"
                onChange={handleChange}
                value={form.no || ''}
                className="w-1/3"
                autoFocus
                InputProps={{
                  readOnly: !!data?.id
                }}
              />
            </div>
          )}

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Tgl Transaksi:</Typography>

            {/* <TextField
              type="date"
              name="tgl"
              style={{ width: '13rem' }}
              onChange={handleChange}
              value={moment(form.tgl || null).format('YYYY-MM-DD')}
              required
              InputProps={{
                readOnly: !!data?.id
              }}
            /> */}
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

          {[TransaksiSaldoKategori.BONUS, TransaksiSaldoKategori.TRANSAKSI_LAIN].includes(form.kategori) && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Jenis Transaksi:</Typography>

              <TextField
                select
                name="jenis"
                value={form.jenis}
                onChange={handleChange}
                InputProps={{
                  readOnly: !!data?.id
                }}
              >
                {Object.values(JenisTransaksi).map(item => (
                  <MenuItem key={item} value={item}>
                    {_.startCase(item)}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}

          {![TransaksiSaldoKategori.SETORAN, TransaksiSaldoKategori.PENARIKAN].includes(form.kategori) && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Kategori:</Typography>

              <TextField
                select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                InputProps={{
                  readOnly: !!data?.id
                }}
              >
                {Object.values(TransaksiSaldoKategori)
                  .filter(item => [TransaksiSaldoKategori.BONUS, TransaksiSaldoKategori.TRANSAKSI_LAIN].includes(item))
                  .map(item => (
                    <MenuItem key={item} value={item}>
                      {_.startCase(item)}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          )}

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Via:</Typography>

            <TextField
              select
              name="via"
              value={form.via || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !!data?.id
              }}
            >
              <MenuItem value="">-</MenuItem>
              {Object.values(TransaksiSaldoVia).map(item => (
                <MenuItem key={item} value={item}>
                  {_.startCase(item)}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {form.via === TransaksiSaldoVia.TRANSFER && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Nama Bank:</Typography>

              <TextField
                name="namaBank"
                onChange={handleChange}
                value={form.namaBank || ''}
                className="w-1/3"
                InputProps={{
                  readOnly: !!data?.id
                }}
              />
            </div>
          )}

          {form.via === TransaksiSaldoVia.TRANSFER && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Atas Nama:</Typography>

              <TextField
                name="atasNama"
                onChange={handleChange}
                value={form.atasNama || ''}
                className="w-1/3"
                InputProps={{
                  readOnly: !!data?.id
                }}
              />
            </div>
          )}

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Nominal:</Typography>

            <NumberFormat
              name="nominal"
              value={form.nominal || ''}
              onValueChange={val => setInForm('nominal', val.value)}
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
              InputProps={{
                readOnly: !!data?.id
              }}
            />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Catatan:</Typography>

            <TextField
              name="catatan"
              onChange={handleChange}
              value={form.catatan || ''}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              InputProps={{
                readOnly: !!data?.id
              }}
            />
          </div>
        </FuseAnimateGroup>
      </DialogContent>

      {!data?.id && (
        <DialogActions>
          <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
            Simpan
          </Button>
        </DialogActions>
      )}
    </form>
  );
}

export default TransaksiSaldoForm;
