import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Dialog, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PilihanPaketDialog from './PilihanPaketDialog';
import PilihanPaketList from './PilihanPaketList';
import PilihanPaketToolbar from './PilihanPaketToolbar';
import { closeListPilihanPaketDialog } from './store/actions';
import reducer from './store/reducers';

function PilihanPaket() {
  const dispatch = useDispatch();
  const { isLoading, props } = useSelector(({ pilihanPaket }) => pilihanPaket.list);

  const handleClose = () => {
    dispatch(closeListPilihanPaketDialog());
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-8 w-full' }}
      {...props}
      onClose={handleClose}
      maxWidth="md"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <PilihanPaketDialog />
      <Toolbar className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-center w-full">
          <Typography variant="h6" color="inherit" className="w-full mt-12">
            Daftar Pilihan Paket
          </Typography>

          <IconButton disabled={isLoading} className="absolute right-0" color="inherit" onClick={handleClose}>
            <Icon className="text-28">close</Icon>
          </IconButton>
        </div>
      </Toolbar>

      <FuseAnimateGroup
        enter={{
          animation: 'transition.slideDownIn',
          delay: 200,
          duration: 500
        }}
        className="flex flex-col flex-auto overflow-auto items-center p-24"
      >
        <PilihanPaketToolbar />
        <PilihanPaketList />
      </FuseAnimateGroup>
    </Dialog>
  );
}

export default withReducer('pilihanPaket', reducer)(PilihanPaket);
