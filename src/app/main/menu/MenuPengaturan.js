import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
	Icon,
	Typography,
	Popper,
	Grow,
	Paper,
	MenuList,
	MenuItem,
	makeStyles,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import History from '@history';

const useStyles = makeStyles(theme => ({
	menu: {
		background: theme.palette.primary.main
	}
}));

function MenuPengaturan(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleClickMenu = () => {
		console.log('You clicked the menu');
	};

	const handleListKeyDown = event => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	};

	return (
		<div>
			<div className="w-224 h-224 p-16">
				<Link
					to="/"
					ref={anchorRef}
					className={clsx(
						props.classes.board,
						'flex flex-col items-center justify-center w-full h-full rounded py-24'
					)}
					role="button"
					onMouseOver={() => setOpen(true)}
					onFocus={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
				>
					<Icon className="text-56">assessment</Icon>
					<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
						Pengaturan
					</Typography>
				</Link>
			</div>
			<Popper
				className="z-9999"
				onMouseOver={() => setOpen(true)}
				onFocus={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<Paper className={classes.menu} elevation={8}>
							<MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
								<MenuItem onClick={handleClickMenu}>
									<ListItemIcon>
										<Icon>schedule</Icon>
									</ListItemIcon>
									<ListItemText primary="Periode" />
								</MenuItem>
								<MenuItem onClick={handleClickMenu}>
									<ListItemIcon>
										<Icon>tune</Icon>
									</ListItemIcon>
									<ListItemText primary="Referensi" />
								</MenuItem>
								<MenuItem onClick={() => History.push('/pengguna')}>
									<ListItemIcon>
										<Icon>group</Icon>
									</ListItemIcon>
									<ListItemText primary="Pengguna" />
								</MenuItem>
							</MenuList>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
}

export default MenuPengaturan;
