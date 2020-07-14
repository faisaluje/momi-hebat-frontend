import React from 'react';
import { makeStyles, Breadcrumbs, Icon, Typography, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import reducer from './store/reducers';
import PackingToolbar from './PackingToolbar';
import PackingTable from './PackingTable';
import PackingDialog from './PackingDialog';
import { getListPacking } from './store/actions';
import Karyawan from './karyawan/Karyawan';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  }
}));

function Packing(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { isLoading, isRefresh, periodeId } = useSelector(({ packing }) => packing.table);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListPacking(periodeId));
    }
  }, [dispatch, isRefresh, periodeId]);

  return (
    <>
      <Karyawan />
      <PackingDialog />
      <div className={clsx(classes.root, 'p-8')}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/" className="flex items-center">
            <Icon className="mr-8">home</Icon>
            Menu Utama
          </Link>
          {/* <Link color="inherit" to="/getting-started/installation/">
						Core
          </Link> */}
          <Typography color="textPrimary">Packing</Typography>
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
          <PackingToolbar />
          <PackingTable />
        </FuseAnimateGroup>
      )}
    </>
  );
}

export default withReducer('packing', reducer)(Packing);
