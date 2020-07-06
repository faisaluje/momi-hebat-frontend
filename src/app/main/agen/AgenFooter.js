import React from 'react';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

function AgenFooter() {
	const { data, status } = useSelector(({ agen }) => agen.table);

	return (
		<div className="pt-8 self-start">
			<Typography className="font-bold">
				Total Agen {_.startCase(status)}: {data.length}
			</Typography>
		</div>
	);
}

export default AgenFooter;
