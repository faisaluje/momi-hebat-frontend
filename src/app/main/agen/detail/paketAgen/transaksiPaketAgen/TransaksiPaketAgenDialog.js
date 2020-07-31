import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Typography, Toolbar, IconButton, Icon } from '@material-ui/core';
import { startCase } from 'lodash';
import { closeTransaksiPaketAgenDialog } from './store/actions';
import TransaksiPaketAgenForm from './TransaksiPaketAgenForm';

function TransaksiPaketAgenDialog() {
  const dispatch = useDispatch();
  const { isLoading, props, jenis } = useSelector(({ transaksiPaketAgen }) => transaksiPaketAgen.form);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

  const handleClose = () => {
    dispatch(closeTransaksiPaketAgenDialog());
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
            {startCase(jenis)} Paket Agen {agen?.diri?.nama?.lengkap}
          </Typography>

          <IconButton disabled={isLoading} className="absolute right-0" color="inherit" onClick={handleClose}>
            <Icon className="text-28">close</Icon>
          </IconButton>
        </div>
      </Toolbar>

      <TransaksiPaketAgenForm />
    </Dialog>
  );
}

export default TransaksiPaketAgenDialog;
