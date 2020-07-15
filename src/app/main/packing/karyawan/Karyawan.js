import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { CircularProgress, Dialog, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KaryawanTable from './KaryawanTable';
import KaryawanToolbar from './KaryawanToolbar';
import { closeListKaryawanDialog } from './store/actions';
import reducer from './store/reducers';
import KaryawanDialog from './KaryawanDialog';

function Karyawan() {
  const dispatch = useDispatch();
  const { isLoading, props } = useSelector(({ karyawan }) => karyawan.table);

  const handleClose = () => {
    dispatch(closeListKaryawanDialog());
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
      {isLoading ? (
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      ) : (
        <>
          <KaryawanDialog />
          <Toolbar className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <Typography variant="h6" color="inherit" className="w-full mt-12">
                Daftar Karyawan
              </Typography>

              <IconButton className="absolute right-0" color="inherit" onClick={handleClose}>
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
            <KaryawanToolbar />
            <KaryawanTable />
          </FuseAnimateGroup>
        </>
      )}
    </Dialog>
  );
}

export default withReducer('karyawan', reducer)(Karyawan);
