import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseUtils from '@fuse/utils';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { getListAgen, setAgenForm, openAgenDialog } from './store/actions';

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
								{/* <TableCell>-</TableCell> */}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} align="center">
								Belum ada periode. . .
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default AgenTable;
