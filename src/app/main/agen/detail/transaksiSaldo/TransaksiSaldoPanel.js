import React from 'react';
import PropTypes from 'prop-types';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import TransaksiSaldoToolbar from './TransaksiSaldoToolbar';
import reducer from './store/reducers';
import TransaksiSaldoTable from './TransaksiSaldoTable';
import { exitListTransaksiSaldo } from './store/actions';

function TransaksiSaldoPanel(props) {
  const dispatch = useDispatch();
  const { value, index } = props;
  const { isLoading } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);

  React.useEffect(() => {
    return () => dispatch(exitListTransaksiSaldo());
  }, [dispatch]);

  return (
    <div hidden={value !== index} className="flex flex-col flex-auto overflow-auto items-center p-12 w-full">
      {isLoading ? (
        <>
          <CircularProgress color="secondary" />
          <Typography className="mt-8">Sedang memuat data. . .</Typography>
        </>
      ) : (
        <>
          <TransaksiSaldoToolbar />
          <TransaksiSaldoTable />
        </>
      )}
    </div>
  );
}

TransaksiSaldoPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default withReducer('transaksiSaldo', reducer)(TransaksiSaldoPanel);
