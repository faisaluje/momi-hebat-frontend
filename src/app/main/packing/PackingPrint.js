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

function PackingPrint({ onClose, open }) {
  const { data } = useSelector(({ packing }) => packing.form);

  const handleClose = () => {
    onClose();
  };

  const onCetak = () => {
    window.print();
  };

  let totalBiaya = 0;

  return (
    <Dialog open={open} onClose={handleClose} fullScreen fullWidth hideBackdrop>
      <DialogTitle className="p-0 print:hidden">
        <AppBar className="relative">
          <Toolbar>
            <div className="flex flex-row flex-1 items-center">
              <IconButton color="inherit" onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
              <Typography variant="h6">Cetak Transaksi Kartu Paket</Typography>
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
              no: 'Packing',
              tgl: data?.tgl
            }}
          />

          <div className="my-12" />

          <table className="border-collapse border-black">
            <thead>
              <tr>
                <th className="p-4 border w-48">No.</th>
                <th className="p-4 border">Karyawan</th>
                <th className="p-4 border">Nama Paket</th>
                <th className="p-4 border w-76">Qty</th>
                <th className="p-4 border w-136">Biaya</th>
              </tr>
            </thead>

            <tbody>
              {data?.proses?.length > 0 &&
                data.proses.map((proses, idx) => {
                  const biaya = (proses.jenisPaket?.biayaPacking || 0) * (proses.jumlah || 0);
                  totalBiaya += biaya;

                  return (
                    <tr key={idx}>
                      <td className="p-4 border-r border-l border-black" align="right">
                        {idx + 1}
                      </td>
                      <td className="p-4 border-r border-black">{strOrStrip(proses.karyawan?.nama)}</td>
                      <td className="p-4 border-r border-black">{strOrStrip(proses.jenisPaket?.nama)}</td>
                      <td className="p-4 border-r border-black">{thousandSeparator(proses.jumlah)}</td>
                      <td className="p-4 border-r border-black">Rp. {thousandSeparator(biaya)}</td>
                    </tr>
                  );
                })}

              <tr className="border-t border-black">
                <th className="p-4 pt-12" colSpan={4} align="right">
                  Total :
                </th>

                <th className="p-4 pt-12" align="left">
                  Rp. {thousandSeparator(totalBiaya)}
                </th>
              </tr>
            </tbody>
          </table>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}

PackingPrint.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default PackingPrint;
