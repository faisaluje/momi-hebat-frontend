import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import * as authActions from 'app/auth/store/actions';
import PasswordDialg from 'app/main/pengguna/PasswordDialog';
import PenggunaDialog from 'app/main/pengguna/PenggunaDialog';
import {
  openPasswordDialog,
  openPenggunaDialog,
  setPasswordForm,
  setPenggunaForm
} from 'app/main/pengguna/store/actions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const onClickProfile = () => {
    dispatch(setPenggunaForm(user.data));
    console.log(user.data);
    dispatch(openPenggunaDialog());
    userMenuClose();
  };

  const onClickUbahPassword = () => {
    dispatch(setPasswordForm({ id: user.data.id }));
    dispatch(openPasswordDialog());
    userMenuClose();
  };

  return (
    <>
      <PenggunaDialog />
      <PasswordDialg />
      <Button className="h-64" onClick={userMenuClick}>
        {user.data.photoURL ? (
          <Avatar className="" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="">{user.data.nama[0]}</Avatar>
        )}

        <div className="hidden md:flex flex-col mx-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user.data.nama}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {user.data.peran}
          </Typography>
        </div>

        <Icon className="text-16 hidden sm:flex" variant="action">
          keyboard_arrow_down
        </Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={onClickProfile} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="Profile Saya" />
            </MenuItem>
            <MenuItem onClick={onClickUbahPassword} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>vpn_key</Icon>
              </ListItemIcon>
              <ListItemText primary="Ubah Password" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(authActions.logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
