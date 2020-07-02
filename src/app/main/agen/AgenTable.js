import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseUtils from '@fuse/utils';
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	FormControlLabel,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	DialogContentText
} from '@material-ui/core';
import { openDialog, closeDialog } from 'app/store/actions';
import { getListAgen, setAgenForm, openAgenDialog, saveAgen } from './store/actions';
import GreenSwitch from '../components/GreenSwitch';
import AgenStatus from './AgenStatus';

function getFilteredArray(data, txtCari) {
	const arr = Object.keys(data).map(id => data[id]);
	if (txtCari.length < 1) {
		return arr;
	}
	return FuseUtils.filterArrayByString(arr, txtCari);
}

function AgenTable() {
	const dispatch = useDispatch();
	const { isRefresh, data, txtCari } = useSelector(({ agen }) => agen.table);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (isRefresh) {
			dispatch(getListAgen());
		}
	}, [dispatch, isRefresh]);

	React.useEffect(() => {
		if (data) {
			setRows(getFilteredArray(data, txtCari));
		}
	}, [data, txtCari]);

	const onClickAgen = agen => {
		dispatch(setAgenForm(agen));
		dispatch(openAgenDialog());
	};

	const handleChangeStatus = agen => {
		dispatch(
			openDialog({
				children: (
					<>
						<DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Agen {agen.diri.nama.lengkap} akan{' '}
								{agen.status === AgenStatus.aktif.value ? 'dinonaktifkan' : 'aktifkan'} ?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
							<Button onClick={() => onChangeStatus(agen)} autoFocus>
								Iya
							</Button>
						</DialogActions>
					</>
				)
			})
		);
	};

	const onChangeStatus = agen => {
		dispatch(
			saveAgen({
				...agen,
				status: agen.status === AgenStatus.aktif.value ? AgenStatus.tidak_aktif.value : AgenStatus.aktif.value
			})
		);
		dispatch(closeDialog());
	};

	return (
		<TableContainer component={Paper} elevation={8} className="my-12">
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						<TableCell className="w-12">No.</TableCell>
						<TableCell>Nama Agen</TableCell>
						<TableCell>No. Tlp</TableCell>
						<TableCell>Alamat</TableCell>
						<TableCell>Kabupaten / Kota</TableCell>
						<TableCell>Level Agen</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{rows.length > 0 ? (
						rows.map((agen, idx) => (
							<TableRow key={agen.id}>
								<TableCell>{idx + 1}</TableCell>
								<TableCell>
									<Typography
										className="text-blue hover:underline"
										role="button"
										onClick={() => onClickAgen(agen)}
									>
										{agen.diri.nama?.lengkap}
									</Typography>
								</TableCell>
								<TableCell>{agen.diri.noTlp}</TableCell>
								<TableCell>{agen.diri.alamat?.jalan}</TableCell>
								<TableCell>{agen.diri.alamat?.kabKota}</TableCell>
								<TableCell>{agen.level}</TableCell>
								<TableCell>
									<FormControlLabel
										control={
											<GreenSwitch
												checked={agen.status === 'aktif'}
												onChange={() => handleChangeStatus(agen)}
											/>
										}
										label={AgenStatus[agen.status].label}
									/>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={7} align="center">
								Belum ada Agen. . .
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default AgenTable;
