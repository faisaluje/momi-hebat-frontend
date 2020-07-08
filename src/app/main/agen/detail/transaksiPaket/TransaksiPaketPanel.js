import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function TransaksiPaketPanel(props) {
  const { value, index } = props;

  return (
    <div hidden={value !== index} className="flex flex-col flex-auto overflow-auto items-center p-12 bg-amber">
      <Typography variant="h3">Menu Paket untuk agen</Typography>
    </div>
  );
}

TransaksiPaketPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default TransaksiPaketPanel;
