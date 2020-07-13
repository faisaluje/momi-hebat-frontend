import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class PaketService {
  static async getListPaketData(status = 'aktif', periodeId = null) {
    try {
      const { data } = await Axios.get(`${URL_API}/jenis-paket`, {
        params: {
          periodeId,
          status
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

  static async createPaket(data) {
    try {
      const result = await Axios.post(`${URL_API}/jenis-paket`, { ...data }, { timeout: 30000 });
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

  static async updatePaket(id, data) {
    try {
      delete data.createdAt;
      delete data.updatedAt;
      delete data.periode;

      const result = await Axios.patch(`${URL_API}/jenis-paket/${id}`, data, { timeout: 30000 });
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
}

export default PaketService;
