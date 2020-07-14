import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class PackingService {
  static async getListPackingData(periodeId = null) {
    try {
      const { data } = await Axios.get(`${URL_API}/packing`, {
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
        msg: e.response?.message || e.message || 'Gagal mengambil data paket'
      };
    }
  }

  static async createPacking(data) {
    try {
      const result = await Axios.post(`${URL_API}/packing`, { ...data }, { timeout: 30000 });
      if (!result.data) {
        throw new Error('Result is not readable');
      }

      return { success: true, data: result.data };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }

  static async deletePacking(id) {
    try {
      const result = await Axios.delete(`${URL_API}/packing/${id}`, { timeout: 30000 });
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

export default PackingService;
