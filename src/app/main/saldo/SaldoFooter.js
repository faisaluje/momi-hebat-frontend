/* eslint-disable radix */
import React from 'react';
import { Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { setListSaldoPage } from './store/actions';

function SaldoFooter() {
  const dispatch = useDispatch();
  const { data, page } = useSelector(({ saldo }) => saldo.table);

  const handleChange = (_event, value) => {
    dispatch(setListSaldoPage(value));
  };

  return (
    <Paper elevation={3} className="flex flex-wrap mt-10 p-8 justify-center w-full bg-gray-50">
      <div className="mt-12 sm:mt-0">
        {data?.totalPages && (
          <Pagination count={data.totalPages} page={page} onChange={handleChange} showFirstButton showLastButton />
        )}
      </div>
    </Paper>
  );
}

export default SaldoFooter;
