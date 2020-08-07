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
import { startCase } from 'lodash';
import { strOrStrip, thousandSeparator } from 'app/Utils';
import React from 'react';
import { useSelector } from 'react-redux';
import HeaderTransaksiPrint from 'app/main/components/HeaderTransaksiPrint';
import terbilang from 'angka-menjadi-terbilang';

function TransaksiSaldoPrint({ onClose, open }) {
  const { data } = useSelector(({ transaksiSaldo }) => transaksiSaldo.form);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

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
              <Typography variant="h6">Cetak Transaksi Saldo</Typography>
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
              no: data?.no,
              tgl: data?.tgl,
              jenis: 'Saldo'
            }}
          />

          <div className="my-12" />

          <div className="flex mb-24 items-center justify-center">
            <Typography className="font-light capitalize" variant="h4">
              {data?.kategori === 'paket' ? (data?.jenis === 'keluar' ? 'Booking ' : 'Cancel ') : ''}
              {data?.kategori === 'cashback' ? (data?.jenis === 'keluar' ? 'Pengemblian ' : 'Penerimaan ') : ''}
              {startCase(data?.kategori)}
            </Typography>
          </div>

          <div className="flex mb-8 items-center">
            <Typography className="w-160">Agen</Typography>

            <Typography>
              : {agen?.no} - {agen?.diri?.nama?.lengkap}
            </Typography>
          </div>

          <div className="flex mb-8 items-center">
            <Typography className="w-160">Banyaknya Uang</Typography>

            <span>: </span>

            <Typography className="pl-4 text-20 font-bold italic">
              {data?.nominal ? startCase(`${terbilang(data?.nominal)} rupiah`) : ''}
            </Typography>
          </div>

          {data?.via && (
            <div className="flex mb-8">
              <Typography className="w-160">Via</Typography>

              <Typography className="italic">
                : {data.via} {data.via === 'transfer' && `${data.namaBank} a.n. ${data.atasNama}`}
              </Typography>
            </div>
          )}

          <div className="flex mb-8">
            <Typography className="w-160">Catatan</Typography>

            <Typography className="italic">: {strOrStrip(data?.catatan)}</Typography>
          </div>

          <div className="flex mt-52">
            <Typography className="w-160">Terbilang</Typography>

            <Typography className="text-16 font-bold italic underline">
              Rp. {strOrStrip(thousandSeparator(data?.nominal))}
            </Typography>
          </div>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}

TransaksiSaldoPrint.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default TransaksiSaldoPrint;
