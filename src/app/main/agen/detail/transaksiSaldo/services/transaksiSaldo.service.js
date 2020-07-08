const { default: Axios } = require('axios');
const { URL_API } = require('app/Constants');

class TransaksiSaldoService {
  static async getListTransaksiSaldo(agenId) {
    try {
      const { data } = await Axios.get(`${URL_API}/transaksi-saldo/${agenId}`, {
        timeout: 30000
      });
      if (!Array.isArray(data)) {
        throw new Error('Result is not array');
      }

      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data transaksi saldo'
      };
    }
  }
}

export default TransaksiSaldoService;
