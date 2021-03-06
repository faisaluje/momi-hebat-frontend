import React from 'react';
import clsx from 'clsx';
import {
  Icon,
  Typography,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  makeStyles,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import History from '@history';

const useStyles = makeStyles(theme => ({
  menu: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}));

function MenuLaporan(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="w-224 h-224 p-16">
        <span
          ref={anchorRef}
          className={clsx(props.classes.board, 'flex flex-col items-center justify-center w-full h-full rounded py-24')}
          onMouseOver={() => setOpen(true)}
          onFocus={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Icon className="text-56">assessment</Icon>
          <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
            Laporan
          </Typography>
        </span>
      </div>
      <Popper
        className="z-9999"
        onMouseOver={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.menu} elevation={8}>
              <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={() => History.push('/laporan/list-agen')}>
                  <ListItemIcon>
                    <Icon className={classes.menu}>people</Icon>
                  </ListItemIcon>
                  <ListItemText primary="List Agen" />
                </MenuItem>

                <MenuItem onClick={() => History.push('/laporan/list-transaksi-saldo')}>
                  <ListItemIcon>
                    <Icon className={classes.menu}>transform</Icon>
                  </ListItemIcon>
                  <ListItemText primary="List Transaksi Saldo" />
                </MenuItem>

                <MenuItem onClick={() => History.push('/laporan/list-kartu-paket-agen')}>
                  <ListItemIcon>
                    <Icon className={classes.menu}>payment</Icon>
                  </ListItemIcon>
                  <ListItemText primary="List Kartu Paket Agen" />
                </MenuItem>

                <MenuItem onClick={() => History.push('/laporan/stok-kartu-paket')}>
                  <ListItemIcon>
                    <Icon className={classes.menu}>payment</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Stok Kartu Paket" />
                </MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default MenuLaporan;
