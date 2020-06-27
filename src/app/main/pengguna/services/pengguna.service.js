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
}

export default PenggunaService;
