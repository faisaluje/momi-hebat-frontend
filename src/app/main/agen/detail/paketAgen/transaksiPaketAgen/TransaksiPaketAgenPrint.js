import { startCase, sumBy } from 'lodash';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { strOrStrip, thousandSeparator } from 'app/Utils';
import React from 'react';
import { useSelector } from 'react-redux';
import HeaderTransaksiPrint from 'app/main/components/HeaderTransaksiPrint';

function TransaksiPaketAgenPrint({ onClose, open }) {
  const { data } = useSelector(({ transaksiPaketAgen }) => transaksiPaketAgen.form);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { data: dataPaket } = useSelector(({ paketAgen }) => paketAgen.table);

  const handleClose = () => {
    onClose();
  };

  const onCetak = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen fullWidth hideBackdrop>
      <DialogTitle className="p-0 print:hidden">
        <AppBar className="relative">
          <Toolbar>
            <div className="flex flex-row flex-1 items-center">
              <IconButton color="inherit" onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
              <Typography variant="h6">Cetak Transaksi Paket Agen</Typography>
            </div>

            <IconButton color="inherit" onClick={onCetak}>
              <Icon>print</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>

      <DialogContent className="print:bg-white w-full p-0 m-0">
        <Paper
          elevation={3}
          className="flex flex-col flex-auto w-xl mx-auto print:bg-white print:w-full print:h-full mt-24 print:m-0 print:mt-4 print:shadow-none p-24 print:p-0"
        >
          <HeaderTransaksiPrint
            data={{
              no: 'Paket',
              tgl: data?.tgl,
              jenis: startCase(data?.jenis)
            }}
          />

          <div className="my-12" />

          {agen?.diri?.nama?.lengkap && (
            <div className="flex mb-8">
              <Typography className="italic">Agen: {agen.diri.nama.lengkap}</Typography>
            </div>
          )}

          {data?.alamat && (
            <div className="flex mb-8">
              <Typography className="italic">Alamat Pengiriman: {data.alamat}</Typography>
            </div>
          )}

          {data?.catatan && (
            <div className="flex mb-8">
              <Typography className="italic">Catatan: {data.catatan}</Typography>
            </div>
          )}

          <table className="border-collapse border-black">
            <thead>
              <tr>
                <th className="p-4 border w-48">No.</th>
                <th className="p-4 border">Nama Paket</th>
                <th className="p-4 border w-76">Qty</th>
              </tr>
            </thead>

            <tbody>
              {data?.items?.length > 0 &&
                data.items.map((item, idx) => {
                  const paketSelected = dataPaket.find(paket => paket.id === item.paket);

                  return (
                    <tr key={idx}>
                      <td className="p-4 border-r border-l border-black" align="right">
                        {idx + 1}
                      </td>
                      <td className="p-4 border-r border-black">{strOrStrip(paketSelected?.nama)}</td>
                      <td className="p-4 border-r border-black">{thousandSeparator(item.jumlah)}</td>
                    </tr>
                  );
                })}

              <tr className="border-t border-black">
                <th className="p-4 pt-12" colSpan={2} align="right">
                  Total :
                </th>

                <th className="p-4 pt-12" align="left">
                  {thousandSeparator(sumBy(data?.items, 'jumlah'))}
                </th>
              </tr>
            </tbody>
          </table>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}

TransaksiPaketAgenPrint.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default TransaksiPaketAgenPrint;
