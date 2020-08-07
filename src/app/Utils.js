/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import FuseUtils from '@fuse/utils';

export function getFilteredArray(data, txtCari) {
  const arr = Object.keys(data).map(id => data[id]);
  if (txtCari.length < 1) {
    return arr;
  }
  return FuseUtils.filterArrayByString(arr, txtCari);
}

export function thousandSeparator(value, separator = '.') {
  return !value ? '-' : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function strOrStrip(str) {
  return str || '-';
}

export function getFirstDateOfMonth(params) {
  return moment(params?.date || new Date())
    .set({ date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 })
    .utcOffset(params?.offset || -7)
    .toISOString();
}

export function getLastDateOfMonth(params) {
  return moment(params?.date || new Date())
    .set({ date: 31, hour: 23, minute: 59, second: 59 })
    .utcOffset(params?.offset || -7)
    .toISOString();
}
