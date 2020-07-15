import React from 'react';
import { makeStyles, Breadcrumbs, Icon, Typography, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import reducer from './store/reducers';
import KartuPaketToolbar from './KartuPaketToolbar';
import KartuPaketTable from './KartuPaketTable';
import TransaksiKartuPaketList from './transaksiKartuPaket/TransaksiKartuPaketList';
import TransaksiKartuPaketDialog from './transaksiKartuPaket/TransaksiKartuPaketDialog';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  }
}));

function KartuPaket(props) {
  const classes = useStyles(props);
  const { isLoading } = useSelector(({ kartuPaket }) => kartuPaket.table);

  return (
    <>
      <TransaksiKartuPaketList />
      <TransaksiKartuPaketDialog />
      <div className={clsx(classes.root, 'p-8')}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/" className="flex items-center">
            <Icon className="mr-8">home</Icon>
            Menu Utama
          </Link>
          {/* <Link color="inherit" to="/getting-started/installation/">
						Core
          </Link> */}
          <Typography color="textPrimary">Inventory</Typography>
          <Typography color="textPrimary">Kartu Paket</Typography>
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
          <KartuPaketToolbar />
          <KartuPaketTable />
        </FuseAnimateGroup>
      )}
    </>
  );
}

export default withReducer('kartuPaket', reducer)(KartuPaket);
