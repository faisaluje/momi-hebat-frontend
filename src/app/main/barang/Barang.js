import React from 'react';
import { makeStyles, Breadcrumbs, Icon, Typography, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import reducer from './store/reducers';
import BarangToolbar from './BarangToolbar';
import BarangTable from './BarangTable';
import TransaksiBarangList from './transaksiBarang/TransaksiBarangList';
import TransaksiBarangDialog from './transaksiBarang/TransaksiBarangDialog';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  }
}));

function Barang(props) {
  const classes = useStyles(props);
  const { isLoading } = useSelector(({ barang }) => barang.table);

  return (
    <>
      <TransaksiBarangList />
      <TransaksiBarangDialog />
      <div className={clsx(classes.root, 'p-8 print:hidden')}>
        <Breadcrumbs className={classes.root} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/" className="flex items-center">
            <Icon className="mr-8">home</Icon>
            Menu Utama
          </Link>
          <Typography className={classes.root}>Inventory</Typography>
          <Typography className={classes.root}>Barang</Typography>
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
          className={clsx(classes.root, 'flex flex-col flex-auto overflow-auto items-center p-24 print:hidden')}
        >
          <BarangToolbar />
          <BarangTable />
        </FuseAnimateGroup>
      )}
    </>
  );
}

export default withReducer('barang', reducer)(Barang);
