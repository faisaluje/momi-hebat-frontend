import { URL_API } from 'app/Constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class KartuPaketService {
  static async getListKartuPaketData(withTransaksi = false, periodeId = null) {
    try {
      let url = `${URL_API}/kartu-paket`;
      if (withTransaksi) {
        url = `${url}/with-transaksi`;
      }

      const { data } = await Axios.get(`${url}`, {
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
        msg: e.response?.message || e.message || 'Gagal mengambil data kartu paket'
      };
    }
  }

  static async updateKartuPaket(id, data) {
    try {
      delete data.createdAt;
      delete data.updatedAt;

      const result = await Axios.patch(`${URL_API}/kartu-paket/${id}`, data, { timeout: 30000 });
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

export default KartuPaketService;
