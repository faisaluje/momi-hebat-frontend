import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, openDialog, closeDialog } from 'app/store/actions';
import {
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Paper,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography,
	TextField
} from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useForm } from '@fuse/hooks';
import { setAgenForm } from './store/actions';

const defaultBiodataState = {
	nama: { lengkap: '', panggilan: '' },
	alamat: {
		jalan: '',
		rt: '',
		rw: '',
		keluraham: '',
		kecamatan: '',
		kabKota: ''
	},
	lahir: {
		tempat: '',
		tgl: new Date()
	},
	pekerjaan: '',
	noTlp: ''
};

const defaultAgenFormState = {
	no: '',
	diri: { ...defaultBiodataState },
	keluarga: { ...defaultBiodataState },
	topAgen: null
};

function AgenForm() {
	const dispatch = useDispatch();
	const { data, isError, msg, isLoading, jenisAgen } = useSelector(({ agen }) => agen.form);
	const { form, setForm, setInForm, handleChange } = useForm(defaultAgenFormState);
	const canBeSubmitted = true;

	React.useEffect(() => {
		if (data) {
			setForm({ ...data });
		}
	}, [data, setForm]);

	React.useEffect(() => {
		if (!isLoading && !isError && msg) {
			dispatch(
				showMessage({
					message: msg, // text or html
					autoHideDuration: 6000, // ms
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					},
					variant: 'success' // success error info warning null
				})
			);
		}
	}, [dispatch, isError, isLoading, msg]);

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(
			openDialog({
				children: (
					<>
						<DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Apakan anda sudah yakin ?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
							<Button onClick={() => onSubmit()} autoFocus>
								Iya
							</Button>
						</DialogActions>
					</>
				)
			})
		);
	};

	const onSubmit = () => {
		console.log(form);

		dispatch(setAgenForm(form));
		// dispatch(savePeriode({ ...form }));
		dispatch(closeDialog());
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col overflow-auto">
			<DialogContent classes={{ root: 'p-24' }}>
				<FuseAnimateGroup
					enter={{
						animation: 'transition.whirlIn',
						delay: 200,
						duration: 500
					}}
				>
					{isError && (
						<div className="flex mb-16">
							<Paper className="w-full bg-red-500 p-8 text-white">{msg || 'Gagal menyimpan'}</Paper>
						</div>
					)}

					{jenisAgen === 1 && (
						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">No. Agen:</Typography>

							<TextField name="no" onChange={handleChange} value={form.no} fullWidth autoFocus required />
						</div>
					)}

					{['diri', 'keluarga'].map(biodata => (
						<ExpansionPanel elevation={5} defaultExpanded key={biodata}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className="font-bold capitalize">Data {biodata}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<div className="flex mb-16">
									<Typography className="min-w-160 font-bold pt-12">Nama Lengkap:</Typography>

									<TextField
										onChange={event => setInForm(`${biodata}.nama.lengkap`, event.target.value)}
										value={form[biodata].nama.lengkap}
										fullWidth
										autoFocus
									/>
								</div>

								<div className="flex mb-16">
									<Typography className="min-w-160 font-bold pt-12">Nama Panggilan:</Typography>

									<TextField
										onChange={event => setInForm(`${biodata}.nama.panggilan`, event.target.value)}
										value={form[biodata].nama.panggilan}
										fullWidth
										autoFocus
									/>
								</div>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</FuseAnimateGroup>
			</DialogContent>

			<DialogActions>
				<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
					Simpan
				</Button>
			</DialogActions>
		</form>
	);
}

export default AgenForm;
