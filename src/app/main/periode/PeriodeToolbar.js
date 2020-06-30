import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon } from '@material-ui/core';
import { setTxtCariPeriode, refreshListPeriode, openPeriodeDialog } from './store/actions';

function PeriodeToolbar() {
	const dispatch = useDispatch();
	const { txtCari } = useSelector(({ periode }) => periode.table);

	return (
		<div className="m-8 mr-0 w-full flex flex-wrap justify-between">
			<div className="flex flex-wrap items-center">
				<Typography className="mr-8">Cari : </Typography>
				<TextField
					placeholder="Ketik Disini..."
					value={txtCari}
					onChange={event => dispatch(setTxtCariPeriode(event.target.value))}
				/>

				<Button
					size="small"
					variant="contained"
					color="primary"
					startIcon={<Icon>refresh</Icon>}
					className="ml-24"
					onClick={() => dispatch(refreshListPeriode())}
				>
					Refresh
				</Button>
			</div>

			<div className="flex flex-wrap items-center">
				<Button
					size="small"
					variant="contained"
					color="primary"
					startIcon={<Icon>add</Icon>}
					onClick={() => dispatch(openPeriodeDialog())}
				>
					Tambah
				</Button>
			</div>
		</div>
	);
}

export default PeriodeToolbar;
