import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  IconButton,
  Icon,
  Toolbar,
  Typography,
  List,
  ListItemText,
  ListItem
} from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';

function SubAgenDialog(props) {
  const { onClose, open, agen } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Toolbar className="flex flex-row items-center justify-between w-full">
        <Typography variant="h6" color="inherit" className="w-full mt-12">
          Sub Agen {agen?.diri?.nama?.lengkap || '-'}
        </Typography>

        <IconButton className="absolute right-0" color="inherit" onClick={handleClose}>
          <Icon className="text-28">close</Icon>
        </IconButton>
      </Toolbar>

      <DialogContent>
        <FuseAnimate animation="transition.whirlIn" duration={500}>
          <List component="nav">
            {agen?.subAgens?.map(subAgen => (
              <ListItem button key={subAgen.no}>
                <ListItemText primary={`${subAgen.no} - ${subAgen.diri.nama.lengkap}`} />
              </ListItem>
            ))}
          </List>
        </FuseAnimate>
      </DialogContent>
    </Dialog>
  );
}

SubAgenDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  agen: PropTypes.object
};

export default SubAgenDialog;
