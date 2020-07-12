import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class TransaksiBarangService {
  static async getListTransaksiBarang(periodeId = null) {
    try {
      const { data } = await Axios.get(`${URL_API}/transaksi-barang`, {
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
        msg: e.response?.message || e.message || 'Gagal mengambil data barang'
      };
    }
  }

  static async createTransaksiBarang(data) {
    try {
      const result = await Axios.post(`${URL_API}/transaksi-barang`, { ...data }, { timeout: 30000 });
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

  static async deleteTransaksiBarang(id) {
    try {
      const result = await Axios.delete(`${URL_API}/transaksi-barang/${id}`, { timeout: 30000 });
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

export default TransaksiBarangService;
