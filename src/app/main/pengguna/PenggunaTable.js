import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseUtils from '@fuse/utils';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { getListPengguna } from './store/actions';
import PenggunaStatus from './PenggunaStatus';

function getFilteredArray(data, txtCari) {
	const arr = Object.keys(data).map(id => data[id]);
	if (txtCari.length < 1) {
		return arr;
	}
	return FuseUtils.filterArrayByString(arr, txtCari);
}

function PenggunaTable() {
	const dispatch = useDispatch();
	const { isRefresh, data, txtCari } = useSelector(({ pengguna }) => pengguna.table);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (isRefresh) {
			dispatch(getListPengguna());
		}
	}, [dispatch, isRefresh]);

	React.useEffect(() => {
		if (data) {
			setRows(getFilteredArray(data, txtCari));
		}
	}, [data, txtCari]);

	return (
		<TableContainer component={Paper} elevation={8} className="my-12">
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						<TableCell className="w-12">No.</TableCell>
						<TableCell>Username</TableCell>
						<TableCell>Nama</TableCell>
						<TableCell>No. HP</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{rows?.length > 0 ? (
						rows.map((pengguna, idx) => (
							<TableRow key={pengguna.id}>
								<TableCell>{idx + 1}</TableCell>
								<TableCell>{pengguna.username}</TableCell>
								<TableCell>{pengguna.nama}</TableCell>
								<TableCell>{pengguna.noHp}</TableCell>
								<TableCell>{PenggunaStatus[pengguna.status].label}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5} align="center">
								Belum ada pengguna. . .
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default PenggunaTable;
