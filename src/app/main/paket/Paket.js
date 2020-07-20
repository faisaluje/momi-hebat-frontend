import React from 'react';
import { makeStyles, Breadcrumbs, Icon, Typography, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import reducer from './store/reducers';
import PaketToolbar from './PaketToolbar';
import PaketTable from './PaketTable';
import PaketDialog from './PaketDialog';
import PilihanPaket from './pilihanPaket/PilihanPaket';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  }
}));

function Paket(props) {
  const classes = useStyles(props);
  const { isLoading } = useSelector(({ paket }) => paket.table);

  return (
    <>
      <PilihanPaket />
      <PaketDialog />
      <div className={clsx(classes.root, 'p-8')}>
        <Breadcrumbs className={classes.root} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/" className="flex items-center">
            <Icon className="mr-8">home</Icon>
            Menu Utama
          </Link>
          {/* <Link color="inherit" to="/getting-started/installation/">
						Core
          </Link> */}
          <Typography className={classes.root}>Inventory</Typography>
          <Typography className={classes.root}>Paket</Typography>
        </Breadcrumbs>
      </div>

      {isLoading ? (
        <div className={clsx(classes.root, 'flex flex-col flex-auto overflow-auto items-center p-24')}>
          <CircularProgress color="secondary" />
          <Typography className="mt-8">Sedang memuat data. . .</Typography>
        </div>
      ) : (
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideDownIn',
            delay: 200,
            duration: 500
          }}
          className={clsx(classes.root, 'flex flex-col flex-auto overflow-auto items-center p-24')}
        >
          <PaketToolbar />
          <PaketTable />
        </FuseAnimateGroup>
      )}
    </>
  );
}

export default withReducer('paket', reducer)(Paket);
