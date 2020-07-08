import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

function AgenComboBox(props) {
  const { data } = useSelector(({ agen }) => agen.table);
  const dataWithoutCurrentAgen = !props.currentAgen?.id ? data : data.filter(agen => agen.id !== props.currentAgen.id);

  return (
    <Autocomplete
      options={dataWithoutCurrentAgen}
      className={props.className}
      disabled={props.disabled || false}
      onChange={props.onChange}
      value={props.value}
      noOptionsText="Agen tidak ditemukan"
      getOptionSelected={agen => `${agen.no} - ${agen.diri.nama.lengkap}`}
      getOptionLabel={agen => `${agen.no} - ${agen.diri.nama.lengkap}`}
      renderInput={params => (
        <TextField
          {...params}
          variant={props.variant}
          fullWidth
          inputProps={{
            ...params.inputProps,
            className: 'text-black'
          }}
        />
      )}
    />
  );
}

AgenComboBox.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  onChange: PropTypes.func.isRequired,
  currentAgen: PropTypes.object,
  disabled: PropTypes.bool
};

export default AgenComboBox;
