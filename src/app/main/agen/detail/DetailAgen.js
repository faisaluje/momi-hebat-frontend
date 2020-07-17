import React from 'react';
import { makeStyles, Breadcrumbs, Icon, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store/reducers';
import DetailAgenForm from './DetailAgenForm';
import { exitDetailAgen, getDetailAgen } from './store/actions';
import DetailAgenTabs from './DetailAgenTabs';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  }
}));

function DetailAgen(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { agen, isError } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { params } = props.match;

  React.useEffect(() => {
    if (!agen && !isError) {
      dispatch(getDetailAgen(params.agenId));
    }
  }, [agen, dispatch, isError, params.agenId]);

  React.useEffect(() => {
    return () => dispatch(exitDetailAgen());
  }, [dispatch]);

  return (
    <>
      <div className={clsx(classes.root, 'p-8')}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/" className="flex items-center">
            <Icon className="mr-8">home</Icon>
            Menu Utama
          </Link>
          <Link color="inherit" to="/agen">
            Agen
          </Link>
          <Typography color="textPrimary">{agen?.diri?.nama?.lengkap || '[nama agen'}</Typography>
        </Breadcrumbs>
      </div>

      <FuseAnimateGroup
        enter={{
          animation: 'transition.slideDownIn',
          delay: 200,
          duration: 500
        }}
        className={clsx(classes.root, 'flex flex-col flex-auto overflow-auto items-center p-24')}
      >
        <DetailAgenForm />
        <DetailAgenTabs />
      </FuseAnimateGroup>
    </>
  );
}

export default withReducer('detailAgen', reducer)(DetailAgen);
