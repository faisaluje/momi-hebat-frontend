import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function TransaksiPaketPanel(props) {
  return (
    <div className="flex flex-col overflow-auto w-full">
      <Typography variant="h3">Menu Paket untuk agen</Typography>
    </div>
  );
}

TransaksiPaketPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default TransaksiPaketPanel;
