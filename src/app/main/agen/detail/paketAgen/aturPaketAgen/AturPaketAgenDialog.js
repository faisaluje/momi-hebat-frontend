import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Typography, Toolbar, IconButton, Slide, AppBar, DialogTitle } from '@material-ui/core';
import { startCase } from 'lodash';
import CloseIcon from '@material-ui/icons/Close';
import { closeAturPaketAgenDialog } from './store/actions';
import AturPaketAgenForm from './AturPaketAgenForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function AturPaketAgenDialog() {
  const dispatch = useDispatch();
  const { isLoading, props, jenis } = useSelector(({ aturPaketAgen }) => aturPaketAgen.form);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

  const handleClose = () => {
    dispatch(closeAturPaketAgenDialog());
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-8' }}
      {...props}
      onClose={handleClose}
      scroll="paper"
      fullScreen
      disableEscapeKeyDown
      TransitionComponent={Transition}
    >
      <DialogTitle className="p-0">
        <AppBar className="relative">
          <Toolbar>
            <Typography variant="h6" className="ml-8 flex-1">
              {startCase(jenis)} Paket {agen?.diri?.nama?.lengkap}
            </Typography>
            <IconButton disabled={isLoading} color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>

      <AturPaketAgenForm />
    </Dialog>
  );
}

export default AturPaketAgenDialog;
