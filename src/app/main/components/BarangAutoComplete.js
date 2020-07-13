/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { getFilteredArray } from 'app/Utils';

const filter = createFilterOptions();

function BarangAutoComplete(props) {
  return (
    <Autocomplete
      id={props.id}
      value={props.value}
      loading={props.loading}
      onChange={props.onChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // Suggest the creation of a new value
        if (params.inputValue !== '' && getFilteredArray(options, params.inputValue).length < 1) {
          filtered.push({
            inputValue: params.inputValue,
            nama: `Tambah "${params.inputValue}"`
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={props.data}
      getOptionLabel={option => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.nama) {
          return option.nama;
        }
        // Regular option
        return option.nama;
      }}
      renderOption={option => option.nama}
      style={props.style}
      freeSolo
      renderInput={params => (
        <TextField {...params} label={props.label} variant={props.variant} required={props.required} />
      )}
    />
  );
}

BarangAutoComplete.propTypes = {
  id: PropTypes.string,
  data: PropTypes.any.isRequired,
  value: PropTypes.object,
  style: PropTypes.object,
  variant: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export default BarangAutoComplete;
