const { default: Axios } = require('axios');
const { URL_API } = require('app/Constants');

class SaldoService {
  static async getSaldoAgen(periodeId = null) {
    try {
      const { data } = await Axios.get(`${URL_API}/saldo-agen`, {
        params: {
          periodeId
        },
        timeout: 30000
      });

      return { success: true, data: data.saldo };
    } catch (e) {
      if (e.response?.status === 404) {
        return { success: true, data: [] };
      }

      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data user'
      };
    }
  }
}

export default SaldoService;
