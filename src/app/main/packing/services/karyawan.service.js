import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class KaryawanService {
  static async getListKaryawanData(status = 'aktif') {
    try {
      const { data } = await Axios.get(`${URL_API}/karyawan`, {
        params: { status },
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

  static async createKaryawan(data) {
    try {
      const result = await Axios.post(`${URL_API}/karyawan`, data, { timeout: 30000 });
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

  static async updateKaryawan(id, data) {
    try {
      delete data.createdAt;
      delete data.updatedAt;

      const result = await Axios.patch(`${URL_API}/karyawan/${id}`, data, { timeout: 30000 });
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

export default KaryawanService;
