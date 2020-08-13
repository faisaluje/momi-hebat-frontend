import Axios from 'axios';
import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';

class AgenService {
  static async getListAgenData(params) {
    try {
      if (params.agen) {
        params.agenId = params.agen.id;
        delete params.agen;
      }
      const { data } = await Axios.get(`${URL_API}/agen`, {
        params,
        timeout: 30000
      });

      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data user'
      };
    }
  }

  static async createAgen(data) {
    try {
      const result = await Axios.post(`${URL_API}/agen`, { ...data }, { timeout: 30000 });
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

  static async updateAgen(id, data) {
    try {
      delete data.createdAt;
      delete data.updatedAt;

      const result = await Axios.patch(`${URL_API}/agen/${id}`, data, { timeout: 30000 });
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

export default AgenService;
