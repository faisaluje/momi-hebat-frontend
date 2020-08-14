import { URL_API } from 'app/Constants'
import ErrorService from 'app/services/error.service'
import Axios from 'axios'

class PeriodeService {
  static async getListPeriodeData() {
    try {
      const { data } = await Axios.get(`${URL_API}/periode`, { timeout: 30000 });
      if (!Array.isArray(data)) {
        throw new Error('Result is not array');
      }

      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data user'
      };
    }
  }

  static async createPeriode(data) {
    try {
      const result = await Axios.post(
        `${URL_API}/periode`,
        {
          ...data,
          status: 'tidak_aktif'
        },
        { timeout: 30000 }
      );
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

  static async updatePeriode(id, data) {
    try {
      delete data.createdAt;
      delete data.updatedAt;

      const result = await Axios.patch(`${URL_API}/periode/${id}`, data, { timeout: 30000 });
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

export default PeriodeService;
