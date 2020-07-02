import React from 'react';
import { makeStyles, Breadcrumbs, Icon, Typography, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import reducer from './store/reducers';
import AgenToolbar from './AgenToolbar';
import AgenTable from './AgenTable';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.light,
		color: theme.palette.getContrastText(theme.palette.primary.light)
	}
}));

function Agen(props) {
	const classes = useStyles(props);
	const { isLoading } = useSelector(({ agen }) => agen.table);

	return (
		<>
			{/* <PeriodeDialog /> */}
			<div className={clsx(classes.root, 'p-8')}>
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					<Link color="inherit" to="/" className="flex items-center">
						<Icon className="mr-8">home</Icon>
						Menu Utama
					</Link>
					{/* <Link color="inherit" to="/getting-started/installation/">
						Core
          </Link> */}
					<Typography color="textPrimary">Agen</Typography>
				</Breadcrumbs>
			</div>

			<div className={clsx(classes.root, 'flex flex-col flex-auto overflow-auto items-center p-24')}>
				{isLoading ? (
					<div className="flex flex-col justify-center text-center items-center h-full">
						<CircularProgress />
						<Typography className="mt-8">Sedang memuat data. . .</Typography>
					</div>
				) : (
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideDownIn',
							delay: 200,
							duration: 500
						}}
						className="flex flex-col w-full"
					>
						<AgenToolbar />
						<AgenTable />
					</FuseAnimateGroup>
				)}
			</div>
		</>
	);
}

export default withReducer('agen', reducer)(Agen);
