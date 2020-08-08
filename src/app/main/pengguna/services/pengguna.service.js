import Axios from 'axios';
import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';

class PenggunaService {
  static async getListPenggunaData() {
    try {
      const result = await Axios.get(`${URL_API}/pengguna`, { timeout: 30000 });
      if (!result.data.length) {
        throw new Error('Result is not array');
      }

      return { success: true, data: result.data };
    } catch (e) {
      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data user'
      };
    }
  }

  static async createPengguna(data) {
    try {
      const result = await Axios.post(`${URL_API}/pengguna`, data, { timeout: 30000 });
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

  static async updatePengguna(id, data) {
    try {
      delete data.peran;
      delete data.createdAt;
      delete data.updatedAt;

      const result = await Axios.patch(`${URL_API}/pengguna/${id}`, data, { timeout: 30000 });
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

  static async updatePassword(id, data) {
    try {
      const result = await Axios.patch(`${URL_API}/pengguna/changePassword/${id}`, data, { timeout: 30000 });
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

export default PenggunaService;
