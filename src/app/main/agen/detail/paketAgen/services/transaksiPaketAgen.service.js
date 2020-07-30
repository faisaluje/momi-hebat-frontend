import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class TransaksiPaketAgenService {
  static async getListTransaksiPaketAgen(params) {
    try {
      const { data } = await Axios.get(`${URL_API}/transaksi-paket-agen`, {
        params,
        timeout: 30000
      });

      return { success: true, data };
    } catch (e) {
      if (e.response?.status === 404) {
        return { success: true, data: [] };
      }

      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data transaksi'
      };
    }
  }

  static async createTransaksiPaketAgen(data) {
    try {
      const result = await Axios.post(`${URL_API}/transaksi-paket-agen`, { ...data }, { timeout: 30000 });

      return { success: true, data: result.data };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }

  static async deleteTransaksiPaketAgen(id) {
    try {
      const result = await Axios.delete(`${URL_API}/transaksi-paket-agen/${id}`, { timeout: 30000 });
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

export default TransaksiPaketAgenService;
