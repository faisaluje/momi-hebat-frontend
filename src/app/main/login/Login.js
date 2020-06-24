import React from 'react';
import {
	makeStyles,
	Card,
	CardContent,
	CircularProgress,
	Typography,
	TextField,
	InputAdornment,
	Icon,
	IconButton,
	Button
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { showMessage } from 'app/store/actions';
import { submitLogin } from 'app/auth/store/actions';
import clsx from 'clsx';
import FuseAnimate from '@fuse/core/FuseAnimate';

const useStyles = makeStyles(theme => ({
	root: {
		// background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		background: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	}
}));

function Login() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { success, error } = useSelector(({ auth }) => auth.login);

	const [isLoading, setIsLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const { form, handleChange, setForm } = useForm({
		username: '',
		password: ''
	});

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	React.useEffect(() => {
		if (!success && error) {
			dispatch(
				showMessage({
					message: 'Username / Password tidak sesuai', // text or html
					autoHideDuration: 6000, // ms
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					},
					variant: 'error' // success error info warning null
				})
			);
			setIsLoading(false);
		}

		return () => setIsLoading(false);
	}, [dispatch, error, success]);

	function isFormValid() {
		return form.username.length > 0 && form.password.length > 0;
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		setIsLoading(true);
		dispatch(submitLogin(form));
		setForm({
			...form,
			password: ''
		});
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							{/* <Typography variant="h4" align="center" className="uppercase">
								Paket Momi Hebat
							</Typography> */}
							<img className="w-256 m-32" src="assets/images/logos/momi-hebat.svg" alt="logo" />

							{isLoading ? (
								<>
									<CircularProgress className="mt-16 mb-32" />
									<Typography variant="subtitle1">Tungu Sebentar. . .</Typography>
								</>
							) : (
								<>
									<Typography variant="h6" className="mt-16 mb-32">
										MASUK KE AKUN ANDA
									</Typography>

									<form
										name="loginForm"
										noValidate
										className="flex flex-col justify-center w-full"
										onSubmit={handleSubmit}
									>
										<TextField
											className="mb-16"
											label="Username"
											autoFocus
											name="username"
											value={form.username}
											onChange={handleChange}
											variant="outlined"
											required
											fullWidth
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															account_circle
														</Icon>
													</InputAdornment>
												)
											}}
										/>

										<TextField
											className="mb-16"
											label="Password"
											type={showPassword ? 'text' : 'password'}
											name="password"
											value={form.password}
											onChange={handleChange}
											variant="outlined"
											required
											fullWidth
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
														>
															{showPassword ? <Visibility /> : <VisibilityOff />}
														</IconButton>
													</InputAdornment>
												)
											}}
										/>

										<Button
											variant="contained"
											color="primary"
											className="w-224 mx-auto mt-16"
											aria-label="LOG IN"
											disabled={!isFormValid()}
											type="submit"
										>
											MASUK
										</Button>
									</form>
								</>
							)}
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default Login;
