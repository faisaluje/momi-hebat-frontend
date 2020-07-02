import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Icon } from '@material-ui/core';
import { setTxtCariAgen, refreshListAgen, openAgenDialog } from './store/actions';
import AgenConfirmationDialog from './AgenConfirmationDialog';

function AgenToolbar() {
	const dispatch = useDispatch();
	const { txtCari } = useSelector(({ agen }) => agen.table);
	const [openConfirmation, setOpenConfirmation] = React.useState(false);

	const onTambahAgen = () => {
		setOpenConfirmation(true);
	};

	const onJenisSelected = jenisAgen => {
		setOpenConfirmation(false);
		if (jenisAgen) {
			dispatch(openAgenDialog(jenisAgen));
		}
	};

	return (
		<div className="m-8 mr-0 w-full flex flex-wrap justify-between">
			<div className="flex flex-wrap items-center">
				<Typography className="mr-8">Cari : </Typography>
				<TextField
					placeholder="Ketik Disini..."
					value={txtCari}
					onChange={event => dispatch(setTxtCariAgen(event.target.value))}
				/>

				<Button
					size="small"
					variant="contained"
					color="primary"
					startIcon={<Icon>refresh</Icon>}
					className="ml-24"
					onClick={() => dispatch(refreshListAgen())}
				>
					Refresh
				</Button>
			</div>

			<div className="flex flex-wrap items-center">
				<AgenConfirmationDialog open={openConfirmation} onClose={onJenisSelected} />
				<Button
					size="small"
					variant="contained"
					color="primary"
					startIcon={<Icon>add</Icon>}
					onClick={onTambahAgen}
				>
					Tambah
				</Button>
			</div>
		</div>
	);
}

export default AgenToolbar;
