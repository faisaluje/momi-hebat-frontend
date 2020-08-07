import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import Axios from 'axios';
import { URL_API } from 'app/Constants';

function AgenComboBox(props) {
  const [options, setOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function onTextChanged(evt) {
    if (evt.target.value && evt.target.value.toString().trim().length >= 3) {
      setIsLoading(true);

      (async () => {
        const response = await Axios.get(`${URL_API}/agen?nama=${evt.target.value}`);

        if (response && response.data) {
          setOptions(response.data.docs);
        } else {
          setOptions([]);
        }

        setIsLoading(false);
      })();
    } else {
      setOptions([]);
    }
  }

  return (
    <Autocomplete
      openOnFocus
      freeSolo
      autoHighlight
      options={options}
      loading={isLoading}
      size={props.size}
      // classes={{ inputRoot: 'p-0' }}
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
          onChange={onTextChanged}
          fullWidth
          label={props.label}
          InputProps={{
            ...params.InputProps,
            className: 'p-0'
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
  disabled: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium'])
};

export default AgenComboBox;
