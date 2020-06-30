import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseUtils from '@fuse/utils';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { getListPeriode, setPeriodeForm, openPeriodeDialog } from './store/actions';

function getFilteredArray(data, txtCari) {
	const arr = Object.keys(data).map(id => data[id]);
	if (txtCari.length < 1) {
		return arr;
	}
	return FuseUtils.filterArrayByString(arr, txtCari);
}

function PeriodeTable() {
	const dispatch = useDispatch();
	const { isRefresh, data, txtCari } = useSelector(({ periode }) => periode.table);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (isRefresh) {
			dispatch(getListPeriode());
		}
	}, [dispatch, isRefresh]);

	React.useEffect(() => {
		if (data) {
			setRows(getFilteredArray(data, txtCari));
		}
	}, [data, txtCari]);

	const onClickPeriode = periode => {
		dispatch(setPeriodeForm(periode));
		dispatch(openPeriodeDialog());
	};

	return (
		<TableContainer component={Paper} elevation={8} className="my-12">
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						<TableCell className="w-12">No.</TableCell>
						<TableCell>Nama Periode</TableCell>
						<TableCell>Tanggal Mulai</TableCell>
						<TableCell>Tanggal Berakhir</TableCell>
						<TableCell>Aktif</TableCell>
						<TableCell>Referensi</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{rows?.length > 0 ? (
						rows.map((periode, idx) => (
							<TableRow key={periode.id}>
								<TableCell>{idx + 1}</TableCell>
								<TableCell>
									<Typography
										className="text-blue hover:underline"
										role="button"
										onClick={() => onClickPeriode(periode)}
									>
										{periode.nama}
									</Typography>
								</TableCell>
								<TableCell>{periode.tglMulai}</TableCell>
								<TableCell>{periode.tglBerakhir}</TableCell>
								<TableCell>{periode.status}</TableCell>
								<TableCell>-</TableCell>
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

export default PeriodeTable;
