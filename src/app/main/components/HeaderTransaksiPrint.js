import { Icon, Typography } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { strOrStrip } from 'app/Utils';
import React from 'react';
import { useSelector } from 'react-redux';

function HeaderTransaksiPrint({ data }) {
  const { periode } = useSelector(({ auth }) => auth.user.data);

  return (
    <div className="flex flex-row border-black border-b pb-16">
      <div className="flex items-center justify-center">
        <img width="128" src="assets/images/logos/momi-hebat.svg" alt="logo" />
      </div>

      <div className="flex flex-1 flex-row border-l items-center ml-32 pl-24">
        <div className="flex flex-col">
          <Typography>{strOrStrip(periode.referensi?.judul)}</Typography>
          <div className="flex flex-row items-center" style={{ marginLeft: '-0.3rem' }}>
            <Icon style={{ marginRight: '0.5rem' }}>home</Icon>
            <Typography>{strOrStrip(periode.referensi?.alamat)}</Typography>
          </div>

          <div className="flex flex-row items-center">
            <img width="18" src="assets/images/logos/whatsapp.svg" className="mr-8" alt="whatsapp" />
            <Typography>{strOrStrip(periode.referensi?.noHp)}</Typography>
          </div>

          <div className="mx-4" />

          <div className="flex flex-row items-center">
            <img width="18" src="assets/images/logos/instagram.svg" className="mr-8" alt="instagram" />
            <Typography>{strOrStrip(periode.referensi?.ig)}</Typography>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center">
          <Typography className="font-light" variant="h4">
            {strOrStrip(data?.no)}
          </Typography>

          <table>
            <tbody>
              <tr>
                <td className="text-right">
                  <Typography color="textSecondary">Tanggal</Typography>
                </td>
                <td className="px-16">
                  <Typography>{data?.tgl ? moment(data?.tgl).format('D MMMM YYYY') : '-'}</Typography>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <Typography color="textSecondary">Jenis</Typography>
                </td>
                <td className="px-16">
                  <Typography>{data?.jenis}</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

HeaderTransaksiPrint.propTypes = {
  data: PropTypes.object.isRequired
};

export default HeaderTransaksiPrint;
