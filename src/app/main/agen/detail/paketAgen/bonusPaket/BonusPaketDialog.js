import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, CircularProgress, Typography, Toolbar, IconButton, Icon } from '@material-ui/core';
import { closeBonusPaketDialog } from '../store/actions';
import BonusPaketForm from './BonusPaketForm';

function BonusPaketDialog() {
  const dispatch = useDispatch();
  const { isLoading, props } = useSelector(({ paketAgen }) => paketAgen.bonus);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

  const handleClose = () => {
    dispatch(closeBonusPaketDialog());
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
                Atur Bonus Paket {agen?.diri?.nama?.lengkap}
              </Typography>

              <IconButton className="absolute right-0" color="inherit" onClick={handleClose}>
                <Icon className="text-28">close</Icon>
              </IconButton>
            </div>
          </Toolbar>

          <BonusPaketForm />
        </>
      )}
    </Dialog>
  );
}

export default BonusPaketDialog;
