/* eslint-disable import/prefer-default-export */
import FuseUtils from '@fuse/utils';

export function getFilteredArray(data, txtCari) {
  const arr = Object.keys(data).map(id => data[id]);
  if (txtCari.length < 1) {
    return arr;
  }
  return FuseUtils.filterArrayByString(arr, txtCari);
}
