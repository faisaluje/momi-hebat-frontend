import ErrorService from 'app/services/error.service';

const { default: Axios } = require('axios');
const { URL_API } = require('app/Constants');

class TransaksiSaldoService {
  static async getListTransaksiSaldoByAgen(agenId) {
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

  static async getListTransaksiSaldo(params) {
    try {
      const { data } = await Axios.get(`${URL_API}/transaksi-saldo`, {
        params,
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

  static async createTransaksiSaldo(data) {
    try {
      const result = await Axios.post(`${URL_API}/transaksi-saldo`, { ...data }, { timeout: 30000 });
      if (!result.data) {
        throw new Error('Hasil tidak diharapkan');
      }

      return { success: true, data: result.data };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }

  static async deleteTransaksiSaldo(id) {
    try {
      const result = await Axios.delete(`${URL_API}/transaksi-saldo/${id}`, { timeout: 30000 });
      if (result.status !== 204) {
        throw new Error('Hasil tidak diharapkan');
      }

      return { success: true };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }
}

export default TransaksiSaldoService;
