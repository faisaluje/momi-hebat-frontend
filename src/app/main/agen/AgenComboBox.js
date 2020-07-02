import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

function AgenComboBox(props) {
	const { data } = useSelector(({ agen }) => agen.table);
	const dataWithoutCurrentAgen = !props.currentAgen?.id
		? data
		: data.filter(agen => agen.id !== props.currentAgen.id);

	return (
		<Autocomplete
			options={dataWithoutCurrentAgen}
			className={props.className}
			onChange={props.onChange}
			value={props.value}
			getOptionSelected={agen => agen.diri.nama.lengkap}
			getOptionLabel={agen => agen.diri.nama.lengkap}
			renderInput={params => <TextField {...params} variant={props.variant} fullWidth />}
		/>
	);
}

AgenComboBox.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
	onChange: PropTypes.func.isRequired,
	currentAgen: PropTypes.object
};

export default AgenComboBox;
