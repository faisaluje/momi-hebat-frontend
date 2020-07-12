import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, openDialog, closeDialog } from 'app/store/actions';
import moment from 'moment';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
  Typography
} from '@material-ui/core';
import Formsy from 'formsy-react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { setPeriodeForm, savePeriode } from './store/actions';

function PeriodeForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading } = useSelector(({ periode }) => periode.form);
  const formRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);

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

  const disableButton = () => {
    setIsFormValid(false);
  };
  const enableButton = () => {
    setIsFormValid(true);
  };

  const handleSubmit = values => {
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
              <Button onClick={() => onSubmit(values)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onSubmit = values => {
    const form = {
      ...data,
      ...values
    };

    dispatch(setPeriodeForm(form));
    dispatch(savePeriode({ ...form }));
    dispatch(closeDialog());
  };

  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
      ref={formRef}
      className="flex flex-col overflow-auto"
    >
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
            <Typography className="min-w-160 font-bold pt-12">Nama Periode:</Typography>

            <TextFieldFormsy
              type="text"
              name="nama"
              value={data?.nama || ''}
              fullWidth
              validationError="Nama tidak boleh kosong"
              required
              autoFocus
            />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Tanggal Mulai:</Typography>

            <TextFieldFormsy
              type="date"
              name="tglMulai"
              value={data?.tglMulai ? moment(data.tglMulai).format('YYYY-MM-DD') : ''}
              fullWidth
              validationError="Tanggal mulai tidak boleh kosong"
              required
            />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Tanggal Berakhir:</Typography>

            <TextFieldFormsy
              type="date"
              name="tglBerakhir"
              value={data?.tglBerakhir ? moment(data.tglBerakhir).format('YYYY-MM-DD') : ''}
              fullWidth
              validationError="Tanggal berakhir tidak boleh kosong"
              required
            />
          </div>

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">Referensi:</Typography>

            <Paper variant="outlined" square className="flex flex-col w-full p-12 bg-gray-100">
              <TextFieldFormsy
                type="text"
                name="referensi.judul"
                value={data?.referensi?.judul || 'Paket Momi Hebat'}
                label="Judul"
                fullWidth
                validationError="Judul tidak boleh kosong"
                required
              />

              <TextFieldFormsy
                type="text"
                name="referensi.alamat"
                value={data?.referensi?.alamat || 'Komplek Bojong Malaka Indah G5 No. 25 Bandung'}
                label="Alamat"
                fullWidth
                className="my-12"
              />

              <TextFieldFormsy
                type="text"
                name="referensi.noHp"
                value={data?.referensi?.noHp || '085720977414'}
                label="No. Hp"
                validations="isNumeric"
                validationError="No. Hp harus angka"
                fullWidth
              />
            </Paper>
          </div>
        </FuseAnimateGroup>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>
          Simpan
        </Button>
      </DialogActions>
    </Formsy>
  );
}

export default PeriodeForm;
