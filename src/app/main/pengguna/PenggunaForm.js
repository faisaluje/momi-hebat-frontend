import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, openDialog, closeDialog } from 'app/store/actions';
import Formsy from 'formsy-react';
import {
  DialogContent,
  Typography,
  DialogActions,
  Button,
  InputAdornment,
  Icon,
  IconButton,
  FormControlLabel,
  Radio,
  DialogTitle,
  DialogContentText,
  Paper
} from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { TextFieldFormsy, RadioGroupFormsy } from '@fuse/core/formsy';
import PenggunaStatus from './PenggunaStatus';
import { savePengguna, setPenggunaForm } from './store/actions';

function PenggunaForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading } = useSelector(({ pengguna }) => pengguna.form);
  const formRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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
    dispatch(setPenggunaForm(form));
    dispatch(savePengguna({ ...form }));
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
            <Typography className="min-w-160 font-bold pt-12">Nama Pengguna:</Typography>

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

          {!data?.iat && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Username:</Typography>

              <TextFieldFormsy
                type="text"
                name="username"
                value={data?.username || ''}
                fullWidth
                validations="minLength:4"
                validationErrors={{
                  minLength: 'Minimal 4 karakter',
                  isDefaultRequiredValue: 'Username tidak boleh kosong'
                }}
                required
              />
            </div>
          )}

          {!data?.id && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Password:</Typography>

              <TextFieldFormsy
                name="password"
                value={data?.password || ''}
                fullWidth
                validations="minLength:4"
                validationErrors={{
                  minLength: 'Minimal 4 karakter',
                  isDefaultRequiredValue: 'Pasword tidak boleh kosong'
                }}
                required
                InputProps={{
                  className: 'pr-2',
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        <Icon className="text-20" color="action">
                          {showPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          )}

          {!data?.id && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Konfirmasi Password:</Typography>

              <TextFieldFormsy
                type="password"
                name="retypePassword"
                value={data?.retypePassword || ''}
                fullWidth
                validations="equalsField:password"
                validationError="Konfirmasi Password tidak sesuai"
                required
              />
            </div>
          )}

          <div className="flex mb-16">
            <Typography className="min-w-160 font-bold pt-12">No. Handphone:</Typography>

            <TextFieldFormsy
              type="text"
              name="noHp"
              value={data?.noHp || ''}
              fullWidth
              validations="isNumeric"
              validationError="Harus angka semua"
            />
          </div>

          {!data?.iat && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Status:</Typography>

              <RadioGroupFormsy
                row
                name="status"
                value={data?.status || 'aktif'}
                validationError="Status harus diisi"
                required
              >
                {Object.values(PenggunaStatus).map(status => (
                  <FormControlLabel
                    key={status.value}
                    value={status.value}
                    control={<Radio color="primary" />}
                    label={status.label}
                  />
                ))}
              </RadioGroupFormsy>
            </div>
          )}
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

export default PenggunaForm;
