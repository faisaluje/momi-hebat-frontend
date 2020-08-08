import { TextFieldFormsy } from '@fuse/core/formsy';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  InputAdornment,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
import Formsy from 'formsy-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePasswordDialog, savePassword, setPasswordForm } from './store/actions';

function PasswordDialg() {
  const dispatch = useDispatch();
  const { isLoading, props, data, isError, msg } = useSelector(({ pengguna }) => pengguna.password);
  const formRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClose = () => {
    dispatch(closePasswordDialog());
  };

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

  const handleSubmitPassword = values => {
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
              <Button onClick={() => onSubmitPassword(values)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onSubmitPassword = values => {
    const form = {
      ...values,
      id: data.id
    };
    dispatch(setPasswordForm(form));
    dispatch(savePassword(data.id, form));
    dispatch(closeDialog());
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-8 w-full' }}
      {...props}
      onClose={handleClose}
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
    >
      {isLoading ? (
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      ) : (
        <>
          <Toolbar className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <Typography variant="h6" color="inherit" className="w-full mt-12">
                Ubah Password
              </Typography>

              <IconButton className="absolute right-0" color="inherit" onClick={handleClose}>
                <Icon className="text-28">close</Icon>
              </IconButton>
            </div>
          </Toolbar>

          <Formsy
            onValidSubmit={handleSubmitPassword}
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
                  <Typography className="min-w-160 font-bold pt-12">Password Lama:</Typography>

                  <TextFieldFormsy
                    autoFocus
                    name="currentPassword"
                    value={data?.currentPassword || ''}
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

                <div className="flex mb-16">
                  <Typography className="min-w-160 font-bold pt-12">Password Baru:</Typography>

                  <TextFieldFormsy
                    name="newPassword"
                    value={data?.newPassword || ''}
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

                <div className="flex mb-16">
                  <Typography className="min-w-160 font-bold pt-12">Konfirmasi Password Baru:</Typography>

                  <TextFieldFormsy
                    type="password"
                    name="retypeNewPassword"
                    value={data?.retypeNewPassword || ''}
                    fullWidth
                    validations="equalsField:newPassword"
                    validationError="Konfirmasi Password Baru tidak sesuai"
                    required
                  />
                </div>
              </FuseAnimateGroup>
            </DialogContent>

            <DialogActions>
              <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>
                Simpan
              </Button>
            </DialogActions>
          </Formsy>
        </>
      )}
    </Dialog>
  );
}

export default PasswordDialg;
