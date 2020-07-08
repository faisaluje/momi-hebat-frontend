import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, List, ListItem, ListItemText, DialogTitle } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useSelector } from 'react-redux';

function AgenConfirmationDialog(props) {
  const { onClose, open } = props;
  const { data } = useSelector(({ agen }) => agen.table);

  const handleClose = () => {
    onClose();
  };

  const handleJenisSelectedClick = jenisSelected => {
    onClose(jenisSelected);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <FuseAnimate animation="transition.whirlIn" duration={500}>
        <DialogTitle>Pilih Jenis Agen</DialogTitle>
      </FuseAnimate>

      <DialogContent>
        <FuseAnimate animation="transition.whirlIn" duration={500}>
          <List component="nav">
            <ListItem button onClick={() => handleJenisSelectedClick(1)}>
              <ListItemText primary="- Agen Utama" />
            </ListItem>
            <ListItem disabled={data?.length < 1} button onClick={() => handleJenisSelectedClick(2)}>
              <ListItemText primary="- Sub Agen" />
            </ListItem>
          </List>
        </FuseAnimate>
      </DialogContent>
    </Dialog>
  );
}

AgenConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AgenConfirmationDialog;
