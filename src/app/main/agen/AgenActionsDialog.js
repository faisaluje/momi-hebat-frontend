import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, List, ListItem, ListItemText } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import History from '@history';
import { setAgenForm, openAgenDialog } from './store/actions';

function AgenActionsDialog(props) {
  const dispatch = useDispatch();
  const { onClose, open, agen } = props;

  const handleClose = () => {
    onClose();
  };

  const onClickAgenDetail = () => {
    History.push(`/agen/${agen.id}`);
  };

  const onClickEditAgen = () => {
    dispatch(setAgenForm(agen));
    dispatch(openAgenDialog());
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <FuseAnimate animation="transition.whirlIn" duration={500}>
          <List component="nav">
            <ListItem button onClick={onClickAgenDetail}>
              <ListItemText primary="- Agen Detail" />
            </ListItem>
            <ListItem button onClick={onClickEditAgen}>
              <ListItemText primary="- Edit Data Agen" />
            </ListItem>
          </List>
        </FuseAnimate>
      </DialogContent>
    </Dialog>
  );
}

AgenActionsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AgenActionsDialog;
