import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { URL_BACKEND } from 'app/Constants';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.defaults.withCredentials = true;
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					// if (err.response?.status === 401 && err.config && !err.config.__isRetryRequest) {
					// if you ever get an unauthorized response, logout the user
					this.emit('onAutoLogout', 'Invalid access_token');
					// }
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		this.emit('onAutoLogin', true);
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithUsernameAndPassword = (username, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${URL_BACKEND}/api/users/signin`, {
					username,
					password
				})
				.then(response => {
					console.log(response.headers);

					resolve(response.data);
				})
				.catch(err => {
					reject(err.response || true);
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${URL_BACKEND}/api/users/currentuser`)
				.then(response => {
					if (response.data.currentUser) {
						resolve(response.data.currentUser);
					} else {
						throw new Error('Sesi anda telah berakhir, silahkan login kembali');
					}
				})
				.catch(error => {
					this.logout();
					reject(error);
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
