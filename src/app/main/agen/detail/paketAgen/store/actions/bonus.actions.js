import { getDetailAgen } from '../../../store/actions';
import BonusPaketService from '../../services/bonusPaket.service';

export const OPEN_BONUS_PAKET_DIALOG = 'OPEN_BONUS_PAKET_DIALOG';
export const CLOSE_BONUS_PAKET_DIALOG = 'CLOSE_BONUS_PAKET_DIALOG';

export const SAVE_BONUS_PAKET = 'SAVE_BONUS_PAKET';
export const SAVE_BONUS_PAKET_ERROR = 'SAVE_BONUS_PAKET_ERROR';
export const SAVE_BONUS_PAKET_SUCCESS = 'SAVE_BONUS_PAKET_SUCCESS';

export const openBonusPaketDialog = () => ({ type: OPEN_BONUS_PAKET_DIALOG });
export const closeBonusPaketDialog = () => ({ type: CLOSE_BONUS_PAKET_DIALOG });

export function saveBonusPaket(data) {
  return async dispatch => {
    dispatch({ type: SAVE_BONUS_PAKET });

    const { id } = data;
    delete data.id;

    const result = await BonusPaketService.saveBonusPaket(id, data);
    if (!result.success) {
      return dispatch({ type: SAVE_BONUS_PAKET_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_BONUS_PAKET_SUCCESS, payload: result.data });
    dispatch(getDetailAgen(data.agen));
    return dispatch(closeBonusPaketDialog());
  };
}
