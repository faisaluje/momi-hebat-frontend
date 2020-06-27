const { default: Axios } = require('axios');
const { URL_API } = require('app/Constants');

class PenggunaService {
	static async getListPenggunaData() {
		try {
			const result = await Axios.get(`${URL_API}/pengguna`, { timeout: 30000 });
			if (!result.data.length) {
				throw new Error('Result is not array');
			}

			return { success: true, data: result.data };
		} catch (e) {
			return {
				success: false,
				msg: e.response?.message || e.message || 'Gagal mengambil data user'
			};
		}
	}

	static async createPengguna(data) {
		try {
			const result = await Axios.post(`${URL_API}/pengguna`, data, { timeout: 30000 });
			if (!result.data) {
				throw new Error('Result is not readable');
			}

			return { success: true, data: result.data };
		} catch (e) {
			const errors = e.response?.data?.errors || [];
			let msg = '';

			errors.forEach(error => {
				msg += `${error.message},`;
			});

			return {
				success: false,
				msg: msg?.slice(0, -1) || e.message || 'Gagal mendapatkan list pengguna'
			};
		}
	}

	static async updatePengguna(id, data) {
		try {
			delete data.peran;
			delete data.createdAt;
			delete data.updatedAt;

			const result = await Axios.patch(`${URL_API}/pengguna/${id}`, data, { timeout: 30000 });
			if (!result.data) {
				throw new Error('Result is not readable');
			}

			return { success: true, data: result.data };
		} catch (e) {
			const errors = e.response?.data?.errors || [];
			let msg = '';

			errors.forEach(error => {
				msg += `${error.message},`;
			});

			return {
				success: false,
				msg: msg?.slice(0, -1) || e.message || 'Gagal menyimpan pengguna'
			};
		}
	}
}

export default PenggunaService;
