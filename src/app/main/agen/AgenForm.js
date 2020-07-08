import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, openDialog, closeDialog } from 'app/store/actions';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  TextField
} from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useForm } from '@fuse/hooks';
import { setAgenForm, saveAgen } from './store/actions';
import AgenComboBox from './AgenComboBox';

const defaultBiodataState = {
  nama: { lengkap: '', panggilan: '' },
  alamat: {
    jalan: '',
    rt: '',
    rw: '',
    kelurahan: '',
    kecamatan: '',
    kabKota: ''
  },
  lahir: {
    tempat: '',
    tanggal: ''
  },
  pekerjaan: '',
  noTlp: ''
};

const defaultAgenFormState = {
  no: '',
  diri: { ...defaultBiodataState },
  keluarga: { ...defaultBiodataState },
  topAgen: null
};

function AgenForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading, jenisAgen } = useSelector(({ agen }) => agen.form);
  const { form, setForm, setInForm, handleChange } = useForm(defaultAgenFormState);
  const canBeSubmitted = true;

  React.useEffect(() => {
    if (data) {
      setForm({ ...data });
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
    console.log(form);

    dispatch(setAgenForm(form));
    dispatch(saveAgen({ ...form }));
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

          {(jenisAgen === 1 || data?.id) && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">No. Agen:</Typography>

              <TextField
                name="no"
                onChange={handleChange}
                value={form.no}
                className="w-1/3"
                autoFocus
                required
                error={!form.no}
                helperText={!form.no && 'Tidak boleh kosong'}
                InputProps={{
                  readOnly: !!data?.id
                }}
              />
            </div>
          )}

          {(jenisAgen === 2 || data?.topAgen) && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Agen Referral:</Typography>
              <AgenComboBox
                className="w-1/3"
                currentAgen={form}
                value={form.topAgen}
                onChange={(_event, val) => setInForm('topAgen', val)}
                disabled={!!data?.topAgen}
              />
            </div>
          )}

          {['diri', 'keluarga'].map(biodata => (
            <ExpansionPanel elevation={5} defaultExpanded key={biodata}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="font-bold capitalize underline">Data {biodata}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row mb-16 w-full items-center">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">Nama:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      style={{ width: '45%' }}
                      id={`txt-nama-lengkap-${biodata}`}
                      label="Lengkap"
                      onChange={event => setInForm(`${biodata}.nama.lengkap`, event.target.value)}
                      value={form[biodata].nama.lengkap}
                      required
                    />

                    <div style={{ width: '10%' }} />

                    <TextField
                      style={{ width: '45%' }}
                      id={`txt-nama-panggilan-${biodata}`}
                      label="Panggilan"
                      onChange={event => setInForm(`${biodata}.nama.panggilan`, event.target.value)}
                      value={form[biodata].nama.panggilan}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mb-16 w-full">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">Alamat:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      className="w-full"
                      id={`txt-alamat-jalan-${biodata}`}
                      placeholder="Nama Jalan. . ."
                      onChange={event => setInForm(`${biodata}.alamat.jalan`, event.target.value)}
                      value={form[biodata].alamat.jalan}
                      multiline
                    />

                    <TextField
                      style={{ width: '15%' }}
                      label="RT"
                      id={`txt-alamat-rt-${biodata}`}
                      onChange={event => setInForm(`${biodata}.alamat.rt`, event.target.value)}
                      value={form[biodata].alamat.rt}
                    />

                    <div style={{ width: '10%' }} />

                    <TextField
                      style={{ width: '15%' }}
                      label="RW"
                      id={`txt-alamat-rw-${biodata}`}
                      onChange={event => setInForm(`${biodata}.alamat.rw`, event.target.value)}
                      value={form[biodata].alamat.rw}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mb-16 w-full">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">Kelurahan:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      className="w-1/2"
                      id={`txt-alamat-kelurahan-${biodata}`}
                      placeholder="Nama Kelurahan. . ."
                      onChange={event => setInForm(`${biodata}.alamat.kelurahan`, event.target.value)}
                      value={form[biodata].alamat.kelurahan}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mb-16 w-full">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">Kecamatan:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      className="w-1/2"
                      id={`txt-alamat-kecamatan-${biodata}`}
                      placeholder="Nama Kecamatan. . ."
                      onChange={event => setInForm(`${biodata}.alamat.kecamatan`, event.target.value)}
                      value={form[biodata].alamat.kecamatan}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mb-16 w-full">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">Kabupaten / Kota:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      className="w-1/2"
                      id={`txt-alamat-kabkota-${biodata}`}
                      placeholder="Nama Kabupaten / Kota. . ."
                      onChange={event => setInForm(`${biodata}.alamat.kabKota`, event.target.value)}
                      value={form[biodata].alamat.kabKota}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mb-16 w-full items-center">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">Tempat, Tgl Lahir:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      style={{ width: '45%' }}
                      id={`txt-lahir-tempat-${biodata}`}
                      label="Tempat"
                      onChange={event => setInForm(`${biodata}.lahir.tempat`, event.target.value)}
                      value={form[biodata].lahir.tempat}
                    />

                    <div style={{ width: '10%' }} />

                    <TextField
                      type="date"
                      style={{ width: '45%' }}
                      id={`txt-lahir-tanggal-${biodata}`}
                      onChange={event => setInForm(`${biodata}.lahir.tanggal`, event.target.value)}
                      value={
                        form[biodata].lahir.tanggal ? moment(form[biodata].lahir.tanggal).format('YYYY-MM-DD') : ''
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mb-16 w-full">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">Pekerjaan:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      className="w-1/2"
                      id={`txt-pekerjaan-${biodata}`}
                      placeholder="Nama Pekerjaan. . ."
                      onChange={event => setInForm(`${biodata}.pekerjaan`, event.target.value)}
                      value={form[biodata].pekerjaan}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row mb-16 w-full">
                  <div className="flex w-160 pt-12">
                    <Typography className="font-bold">No. Telp.:</Typography>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <TextField
                      className="w-1/2"
                      id={`txt-notlp-${biodata}`}
                      placeholder="Nomor yang bisa dihubungi. . ."
                      onChange={event => setInForm(`${biodata}.noTlp`, event.target.value)}
                      value={form[biodata].noTlp}
                    />
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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

export default AgenForm;
