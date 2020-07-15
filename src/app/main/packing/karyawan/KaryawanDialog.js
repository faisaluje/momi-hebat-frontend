import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Typography, Toolbar, IconButton, Icon } from '@material-ui/core';
import { closeKaryawanDialog } from './store/actions';
import KaryawanForm from './KaryawanForm';

function KaryawanDialog() {
  const dispatch = useDispatch();
  const { isLoading, props, data } = useSelector(({ karyawan }) => karyawan.form);

  const handleClose = () => {
    dispatch(closeKaryawanDialog());
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
      <Toolbar className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-center w-full">
          <Typography variant="h6" color="inherit" className="w-full mt-12">
            {!data?.id ? 'Tambah' : 'Ubah'} Karyawan
          </Typography>

          <IconButton disabled={isLoading} className="absolute right-0" color="inherit" onClick={handleClose}>
            <Icon className="text-28">close</Icon>
          </IconButton>
        </div>
      </Toolbar>

      <KaryawanForm />
    </Dialog>
  );
}

export default KaryawanDialog;
