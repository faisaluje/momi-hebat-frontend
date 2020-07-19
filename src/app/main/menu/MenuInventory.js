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

function MenuInventory(props) {
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
          <Icon className="text-56">work_outline</Icon>
          <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
            Inventory
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
                <MenuItem onClick={() => History.push('/barang')}>
                  <ListItemIcon>
                    <Icon className={classes.menu}>store</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Barang" />
                </MenuItem>
                <MenuItem onClick={() => History.push('/paket')}>
                  <ListItemIcon>
                    <Icon className={classes.menu}>dns</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Paket" />
                </MenuItem>
                <MenuItem onClick={() => History.push('/kartu-paket')}>
                  <ListItemIcon>
                    <Icon className={classes.menu}>payment</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Kartu Paket" />
                </MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default MenuInventory;
