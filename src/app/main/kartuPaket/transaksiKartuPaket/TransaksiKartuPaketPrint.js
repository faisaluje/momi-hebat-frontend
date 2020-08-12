import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';
import { sumBy } from 'lodash';
import PropTypes from 'prop-types';
import { strOrStrip, thousandSeparator } from 'app/Utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTransaksiPrint from 'app/main/components/HeaderTransaksiPrint';
import withReducer from 'app/store/withReducer';
import DetailService from 'app/main/agen/detail/services/detail.service';
import FooterTransaksiPrint from 'app/main/components/FooterTransaksiPrint';
import reducer from '../store/reducers';
import { setTransaksiKartuPaketForm } from '../store/actions';

function TransaksiKartuPaketPrint({ onClose, open }) {
  const dispatch = useDispatch();
  const { data } = useSelector(({ kartuPaket }) => kartuPaket.transaksi.form);
  const [agen, setAgen] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const jenis =
    data?.jenis === 'masuk'
      ? data?.agen
        ? 'Pengembalian Kartu Paket'
        : 'Kartu Paket Stok Masuk'
      : 'Pengambilan Kartu Paket';

  React.useEffect(() => {
    if (!agen && data?.agen) {
      setIsLoading(true);
      DetailService.getDetailAgenData(data.agen)
        .then(result => {
          if (!result.success) {
            setAgen(result.msg);
          } else {
            setAgen(result.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [agen, data]);

  const handleClose = () => {
    setAgen(null);
    dispatch(setTransaksiKartuPaketForm(null));
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
              no: data?.no,
              tgl: data?.tgl,
              jenis:
                data?.jenis === 'masuk'
                  ? data?.agen
                    ? 'Pengembalian Kartu Paket'
                    : 'Kartu Paket Stok Masuk'
                  : 'Pengambilan Kartu Paket'
            }}
          />

          <div className="my-12" />

          {data?.agen ? (
            isLoading ? (
              <div className="flex flex-row items-center mb-8">
                <CircularProgress />
                <Typography className="mt-8">Sedang memproses. . .</Typography>
              </div>
            ) : (
              <div className="flex mb-8">
                <Typography className="italic">
                  Catatan: {jenis} Oleh Agen {agen?.no} - {agen?.diri?.nama?.lengkap}{' '}
                </Typography>
              </div>
            )
          ) : (
            data?.catatan && (
              <div className="flex mb-8">
                <Typography className="italic">Catatan: {data.catatan}</Typography>
              </div>
            )
          )}

          <table className="border-collapse border-black">
            <thead>
              <tr>
                <th className="p-4 border w-48">No.</th>
                <th className="p-4 border">Nama Katu Paket</th>
                <th className="p-4 border w-76">Qty</th>
              </tr>
            </thead>

            <tbody>
              {data?.items?.length > 0 &&
                data.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-4 border-r border-l border-black" align="right">
                      {idx + 1}
                    </td>
                    <td className="p-4 border-r border-black">{strOrStrip(item.kartuPaket?.nama)}</td>
                    <td className="p-4 border-r border-black">{thousandSeparator(item.jumlah)}</td>
                  </tr>
                ))}

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

          <FooterTransaksiPrint />
        </Paper>
      </DialogContent>
    </Dialog>
  );
}

TransaksiKartuPaketPrint.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withReducer('kartuPaket', reducer)(TransaksiKartuPaketPrint);
