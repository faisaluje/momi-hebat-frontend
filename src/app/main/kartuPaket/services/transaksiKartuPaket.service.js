import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class TransaksiKartuPaketService {
  static async getListTransaksiKartuPaketData(periodeId = null) {
    try {
      const { data } = await Axios.get(`${URL_API}/transaksi-kartu-paket`, {
        params: {
          periodeId
        },
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

  static async createTransaksiKartuPaket(data) {
    try {
      const result = await Axios.post(`${URL_API}/transaksi-kartu-paket`, { ...data }, { timeout: 30000 });
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

  static async deleteTransaksiKartuPaket(id) {
    try {
      const result = await Axios.delete(`${URL_API}/transaksi-kartu-paket/${id}`, { timeout: 30000 });
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

export default TransaksiKartuPaketService;
