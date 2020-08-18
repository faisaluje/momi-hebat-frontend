import { Icon, Typography } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { strOrStrip } from 'app/Utils';
import React from 'react';
import { useSelector } from 'react-redux';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';

function HeaderTransaksiPrint({ data }) {
  const { periode } = useSelector(({ auth }) => auth.user.data);

  return (
    <div className="flex border-black border-b pb-12 w-full">
      <div className="flex flex-1 flex-row items-center pl-12">
        <div className="flex flex-col mr-16 print:max-w-256">
          <Typography className="font-saxmono text-20">{strOrStrip(periode.referensi?.judul)}</Typography>
          <div className="flex flex-row items-center" style={{ marginLeft: '-0.3rem' }}>
            <Icon style={{ marginRight: '0.5rem' }}>home</Icon>
            <Typography className="font-saxmono">{strOrStrip(periode.referensi?.alamat)}</Typography>
          </div>

          <div className="flex flex-row items-center">
            <WhatsAppIcon className="mr-8 font-saxmono" fontSize="small" />
            <Typography className="font-saxmono">{strOrStrip(periode.referensi?.noHp)}</Typography>
          </div>

          <div className="mx-4" />

          <div className="flex flex-row items-center">
            <InstagramIcon className="mr-8 font-saxmono" fontSize="small" />
            <Typography className="font-saxmono">{strOrStrip(periode.referensi?.ig)}</Typography>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Typography className="font-saxmono" variant="h4">
          {strOrStrip(data?.no)}
        </Typography>

        <table>
          <tbody>
            <tr>
              <td className="text-right">
                <Typography className="font-saxmono">Tanggal</Typography>
              </td>
              <td className="px-16">
                <Typography className="font-saxmono">
                  {data?.tgl ? moment(data?.tgl).format('D MMMM YYYY') : '-'}
                </Typography>
              </td>
            </tr>

            {data?.jenis && (
              <tr>
                <td className="text-right">
                  <Typography className="font-saxmono">Jenis</Typography>
                </td>
                <td className="px-16">
                  <Typography className="font-saxmono">{data?.jenis}</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

HeaderTransaksiPrint.propTypes = {
  data: PropTypes.object.isRequired
};

export default HeaderTransaksiPrint;
