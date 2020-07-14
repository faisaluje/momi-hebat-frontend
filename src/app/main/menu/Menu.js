import React from 'react';
import { makeStyles, fade, Typography, Icon, Breadcrumbs } from '@material-ui/core';
import clsx from 'clsx';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useSelector } from 'react-redux';
import MenuInventory from './MenuInventory';
import MenuPengaturan from './MenuPengaturan';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    '&:hover': {
      boxShadow: theme.shadows[6]
    }
  },
  newBoard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
    '&:hover': {
      borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
    }
  }
}));

function Menu(props) {
  const classes = useStyles(props);
  const { role, data } = useSelector(({ auth }) => auth.user);

  return (
    <>
      <div className={clsx(classes.root, 'p-8')}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/" className="flex items-center">
            <Icon className="mr-8">home</Icon>
            Menu Utama
          </Link>
          {/* <Link color="inherit" to="/getting-started/installation/">
						Core
					</Link>
					<Typography color="textPrimary">Breadcrumb</Typography> */}
        </Breadcrumbs>
      </div>

      <div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
        <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
          <FuseAnimate>
            <Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">
              Paket Momi Hebat
            </Typography>
          </FuseAnimate>

          <FuseAnimateGroup
            className="flex flex-wrap w-full justify-center py-32 px-16"
            enter={{
              animation: 'transition.slideUpBigIn',
              duration: 300
            }}
          >
            <div className="w-224 h-224 p-16">
              <Link
                to="/agen"
                className={clsx(classes.board, 'flex flex-col items-center justify-center w-full h-full rounded py-24')}
                role="button"
              >
                <Icon className="text-56">people</Icon>
                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
                  Agen
                </Typography>
              </Link>
            </div>

            <MenuInventory classes={classes} />

            <div className="w-224 h-224 p-16">
              <Link
                to="/packing"
                className={clsx(classes.board, 'flex flex-col items-center justify-center w-full h-full rounded py-24')}
                role="button"
              >
                <Icon className="text-56">archive</Icon>
                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
                  Packing
                </Typography>
              </Link>
            </div>

            <div className="w-224 h-224 p-16">
              <Link
                to="/saldo"
                className={clsx(classes.board, 'flex flex-col items-center justify-center w-full h-full rounded py-24')}
                role="button"
              >
                <Icon className="text-56">attach_money</Icon>
                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
                  Saldo
                </Typography>
              </Link>
            </div>

            <div className="w-224 h-224 p-16">
              <Link
                to="/"
                className={clsx(classes.board, 'flex flex-col items-center justify-center w-full h-full rounded py-24')}
                role="button"
              >
                <Icon className="text-56">assessment</Icon>
                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
                  Laporan
                </Typography>
              </Link>
            </div>

            {!role?.find(val => val === 'user') && <MenuPengaturan classes={classes} />}
          </FuseAnimateGroup>

          <FuseAnimate>
            <Typography className="mt-32 py-12 sm:py-24 text-16 sm:text-24 font-300" color="inherit">
              Periode: {data?.periode?.nama || 'Belum ada periode aktif'}
            </Typography>
          </FuseAnimate>
        </div>
      </div>
    </>
  );
}

export default Menu;
