const { URL_API } = require('app/Constants');
const { default: ErrorService } = require('app/services/error.service');
const { default: Axios } = require('axios');

class BonusPaketService {
  static async saveBonusPaket(id, data) {
    try {
      delete data.createdAt;
      delete data.updatedAt;

      const result = await Axios.patch(`${URL_API}/agen/stok/${id}`, data, { timeout: 30000 });
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

export default BonusPaketService;
