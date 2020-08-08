import PenggunaService from '../../services/pengguna.service';

export const OPEN_PASSWORD_DIALOG = 'OPEN_PASSWORD_DIALOG';
export const CLOSE_PASSWORD_DIALOG = 'CLOSE_PASSWORD_DIALOG';

export const SET_PASSWORD_FORM = 'SET_PASSWORD_FORM';

export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_PASSWORD_ERROR = 'SAVE_PASSWORD_ERROR';
export const SAVE_PASSWORD_SUCCESS = 'SAVE_PASSWORD_SUCCESS';

export const setPasswordForm = data => ({ type: SET_PASSWORD_FORM, data });
export const openPasswordDialog = () => ({ type: OPEN_PASSWORD_DIALOG });
export const closePasswordDialog = () => ({ type: CLOSE_PASSWORD_DIALOG });

export function savePassword(id, data) {
  return async dispatch => {
    dispatch({ type: SAVE_PASSWORD });

    let result = { success: false };
    result = await PenggunaService.updatePassword(id, data);

    if (!result.success) {
      return dispatch({ type: SAVE_PASSWORD_ERROR, payload: result.msg });
    }

    dispatch({ type: SAVE_PASSWORD_SUCCESS, payload: result.data });
    return dispatch(closePasswordDialog());
  };
}
