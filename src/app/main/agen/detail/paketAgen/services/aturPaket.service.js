import Axios from 'axios';
import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';

class AturPaketService {
  static async getListAturPaketAgenData(id) {
    try {
      const { data } = await Axios.get(`${URL_API}/pengaturan-paket-agen/${id}`, {
        timeout: 30000
      });

      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data'
      };
    }
  }

  static async createAturPaketAgen(data) {
    try {
      await Axios.post(`${URL_API}/pengaturan-paket-agen`, { ...data }, { timeout: 30000 });

      return { success: true };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }
}

export default AturPaketService;
