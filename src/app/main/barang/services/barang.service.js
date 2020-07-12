import { URL_API } from 'app/Constants';
import Axios from 'axios';

class BarangService {
  static async getListStokBarang(periodeId = null) {
    try {
      const { data } = await Axios.get(`${URL_API}/stok-barang`, {
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
        msg: e.response?.message || e.message || 'Gagal mengambil data stok barang'
      };
    }
  }

  static async getListBarang() {
    try {
      const { data } = await Axios.get(`${URL_API}/barang`, {
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

export default BarangService;
