import { Paper, Popover } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import React from 'react';
import { BlockPicker } from 'react-color';

function ColorsPicker(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper elevation={3} onClick={handleClick} className={clsx(props.className, 'p-8 cursor-pointer hover:shadow-5')}>
        <div style={{ backgroundColor: props.color }} className="w-full h-full" />
      </Paper>
      <Popover
        id={id}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transition
      >
        <BlockPicker color={props.color} onChangeComplete={props.onChangeComplete} />
      </Popover>
    </>
  );
}

ColorsPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChangeComplete: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default ColorsPicker;
