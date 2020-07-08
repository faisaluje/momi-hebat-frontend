import Axios from 'axios';
import { URL_API } from 'app/Constants';

class DetailService {
  static async getDetailAgenData(id) {
    try {
      const { data } = await Axios.get(`${URL_API}/agen/${id}`, {
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
}

export default DetailService;
