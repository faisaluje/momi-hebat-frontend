import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Typography, Toolbar, IconButton, Icon } from '@material-ui/core';
import { closeTransaksiKartuPaketDialog } from '../store/actions';
import TransaksiKartuPaketForm from './TransaksiKartuPaketForm';

function TransaksiKartuPaketDialog() {
  const dispatch = useDispatch();
  const { isLoading, props } = useSelector(({ kartuPaket }) => kartuPaket.transaksi.form);

  const handleClose = () => {
    dispatch(closeTransaksiKartuPaketDialog());
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-8 w-full' }}
      {...props}
      onClose={handleClose}
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
    >
      <Toolbar className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-center w-full">
          <Typography variant="h6" color="inherit" className="w-full mt-12">
            Kartu Paket Masuk
          </Typography>

          <IconButton disabled={isLoading} className="absolute right-0" color="inherit" onClick={handleClose}>
            <Icon className="text-28">close</Icon>
          </IconButton>
        </div>
      </Toolbar>

      <TransaksiKartuPaketForm />
    </Dialog>
  );
}

export default TransaksiKartuPaketDialog;
