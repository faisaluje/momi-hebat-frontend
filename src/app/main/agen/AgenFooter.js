/* eslint-disable radix */
import React from 'react';
import _ from '@lodash';
import { Paper, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { setListAgenPage } from './store/actions';

function AgenFooter() {
  const dispatch = useDispatch();
  const { data, status, level, page } = useSelector(({ agen }) => agen.table);

  const handleChange = (_event, value) => {
    dispatch(setListAgenPage(value));
  };

  return (
    <Paper elevation={3} className="flex flex-wrap mt-10 p-8 justify-between self-start w-full bg-gray-50">
      <Typography className="font-bold self-center">
        Total Agen {_.startCase(status)} {level && `Level ${level}`} : {data.totalDocs}
      </Typography>

      <div className="mt-12 sm:mt-0">
        {data?.totalPages && (
          <Pagination count={data.totalPages} page={page} onChange={handleChange} showFirstButton showLastButton />
        )}
      </div>
    </Paper>
  );
}

export default AgenFooter;
