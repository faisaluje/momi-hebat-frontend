import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function PaketAutoComplete(props) {
  return (
    <Autocomplete
      id={props.id}
      autoHighlight
      disabled={props.disabled || false}
      value={props.value}
      loading={props.loading}
      onChange={props.onChange}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={props.data}
      noOptionsText="Paket tidak ditemukan"
      getOptionLabel={option => option.nama}
      renderOption={option => option.nama}
      style={props.style}
      freeSolo
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          variant={props.variant}
          required={props.required}
          inputProps={{
            ...params.inputProps,
            className: 'text-black'
          }}
        />
      )}
    />
  );
}

PaketAutoComplete.propTypes = {
  id: PropTypes.string,
  data: PropTypes.any.isRequired,
  value: PropTypes.any,
  style: PropTypes.object,
  variant: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

export default PaketAutoComplete;
