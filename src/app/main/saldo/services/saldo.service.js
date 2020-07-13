import AgenService from 'app/main/agen/services/agen.service';
import { orderBy } from 'lodash';

const { default: Axios } = require('axios');
const { URL_API } = require('app/Constants');

class SaldoService {
  static async getSaldo(periodeId = null) {
    try {
      const { data } = await Axios.get(`${URL_API}/saldo-agen`, {
        params: {
          periodeId
        },
        timeout: 30000
      });

      return { success: true, data: data.saldo };
    } catch (e) {
      if (e.response?.status === 404) {
        return { success: true, data: [] };
      }

      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data user'
      };
    }
  }

  static async getSaldoWithAgen(periodeId = null) {
    const saldoAgen = await this.getSaldo(periodeId);
    const listAgen = await AgenService.getListAgenData('all');

    if (!listAgen.data || !saldoAgen.data) {
      return { success: true, data: [] };
    }

    const saldoWithAgen = listAgen.data.map(agen => {
      const saldo = saldoAgen.data.find(item => item.agen === agen.id);

      return {
        agen,
        jumlah: saldo?.jumlah || 0,
        bonus: saldo?.bonus || 0
      };
    });

    return { success: true, data: orderBy(saldoWithAgen, ['agen.level', 'agen.createdAt']) };
  }
}

export default SaldoService;
