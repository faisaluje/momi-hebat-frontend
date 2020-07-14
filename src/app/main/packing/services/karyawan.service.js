import { URL_API } from 'app/Constants';
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
}

export default KaryawanService;
