import React from 'react';
import { Typography } from '@material-ui/core';

function FooterTransaksiPrint() {
  return (
    <div className="flex justify-between w-full mt-24">
      <div className="flex flex-col justify-center items-center text-center">
        <Typography>Yang Menerima</Typography>
        <Typography className="mt-40">________________________</Typography>
      </div>

      <div className="flex flex-col justify-center items-center text-center">
        <Typography>Hormat Kami</Typography>
        <Typography className="mt-40">________________________</Typography>
      </div>
    </div>
  );
}

export default FooterTransaksiPrint;
