import React from 'react';
import moment from 'moment';
import { startCase, sumBy } from 'lodash';
import { Breadcrumbs, Icon, Typography, Button, Paper, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@material-ui/pickers';
import { getFirstDateOfMonth, getLastDateOfMonth, strOrStrip, thousandSeparator } from 'app/Utils';
import reducer from '../agen/detail/transaksiSaldo/store/reducers';
import {
  getListTransaksiSaldo,
  refreshListTransaksiSaldo,
  setParamsTransaksiSaldo
} from '../agen/detail/transaksiSaldo/store/actions';
import AgenComboBox from '../agen/AgenComboBox';
import JenisTransaksi from '../components/JenisTransaksi';

function LaporanListTransaksiSaldo() {
  const dispatch = useDispatch();
  const { data, params, isRefresh, isLoading } = useSelector(({ transaksiSaldo }) => transaksiSaldo.table);
  const { periode } = useSelector(({ auth }) => auth.user.data);
  const [rows, setRows] = React.useState(null);
  const [total, setTotal] = React.useState({ masuk: 0, keluar: 0 });

  React.useEffect(() => {
    if (!rows || isRefresh) {
      dispatch(getListTransaksiSaldo(params));
    }
  }, [dispatch, isRefresh, params, rows]);

  React.useEffect(() => {
    return () => dispatch(refreshListTransaksiSaldo());
  }, [dispatch]);

  React.useEffect(() => {
    if (data?.length < 1) {
      setRows([]);
      setTotal({ masuk: 0, keluar: 0 });
    } else {
      setRows(data);
      setTotal({
        masuk: sumBy(data, val => (val.jenis === JenisTransaksi.MASUK ? val.nominal : 0)),
        keluar: sumBy(data, val => (val.jenis === JenisTransaksi.KELUAR ? val.nominal : 0))
      });
    }
  }, [data]);

  const onPrint = () => {
    const css = '@page { size: A4 landscape; height:100%; width:100% }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.media = 'print';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    window.print();

    head.removeChild(style);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center text-center items-center h-full p-16">
        <CircularProgress />
        <Typography className="mt-8">Sedang memproses. . .</Typography>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col p-8 print:hidden sticky top-0 bg-gray-100">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link to="/" className="flex items-center" style={{ color: '#b20a0a' }}>
            <Icon className="mr-8">home</Icon>
            Menu Utama
          </Link>
          <Typography className="font-bold">Laporan</Typography>
          <Typography className="font-bold">List Transaksi Saldo</Typography>
        </Breadcrumbs>

        <div className="pt-8 w-full flex flex-wrap justify-between">
          <div className="flex flex-wrap items-center">
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Icon>refresh</Icon>}
              onClick={() => dispatch(refreshListTransaksiSaldo())}
            >
              Refresh
            </Button>
          </div>

          <div className="flex flex-wrap items-center">
            <AgenComboBox
              className="min-w-224"
              variant="outlined"
              size="small"
              label="Agen"
              value={params?.agen}
              onChange={(_event, val) => dispatch(setParamsTransaksiSaldo({ ...params, agen: val }))}
            />

            <DatePicker
              inputVariant="outlined"
              views={['year', 'month']}
              size="small"
              openTo="month"
              label="Bulan Transaksi"
              value={params?.dateFirst || getFirstDateOfMonth()}
              className="w-128 mx-0 sm:mx-24"
              onChange={val =>
                dispatch(
                  setParamsTransaksiSaldo({
                    ...params,
                    dateFirst: getFirstDateOfMonth({ date: val.toDate() }),
                    dateLast: getLastDateOfMonth({ date: val.toDate() })
                  })
                )
              }
            />

            <Button
              className="ml-0 sm:ml-12"
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Icon>print</Icon>}
              onClick={onPrint}
            >
              Cetak
            </Button>
          </div>
        </div>
      </div>

      <Paper
        elevation={3}
        className="block w-2xl mx-auto print:w-full mt-24 print:m-0 print:shadow-none p-24 print:p-0"
      >
        <div className="flex flex-row border-black border-b pb-16">
          <div className="flex items-center justify-center">
            <img width="128" src="assets/images/logos/momi-hebat.svg" alt="logo" />
          </div>

          <div className="flex flex-1 flex-col text-center items-center justify-center ml-8">
            <Typography className="font-black text-20">
              DAFTAR TRANSAKSI SALDO AGEN BULAN{' '}
              {moment(params?.dateFirst || new Date())
                .format('MMMM YYYY')
                .toUpperCase()}
            </Typography>

            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center">
                <img width="26" src="assets/images/logos/whatsapp.svg" className="mr-8" alt="whatsapp" />
                <Typography className="text-16">{strOrStrip(periode.referensi.noHp)}</Typography>
              </div>

              <div className="mx-84" />

              <div className="flex flex-row items-center">
                <img width="26" src="assets/images/logos/instagram.svg" className="mr-8" alt="instagram" />
                <Typography className="text-16">{strOrStrip(periode.referensi.ig)}</Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-24">
          <Typography className="font-bold">Total Masuk : Rp. {thousandSeparator(total.masuk)}</Typography>
          <Typography className="font-bold">Total Keluar : Rp. {thousandSeparator(total.keluar)}</Typography>
        </div>

        <table className="border-collapse mt-8 p-8 w-full">
          <thead>
            <tr>
              <th className="border">No.</th>
              <th className="border w-96">Tanggal</th>
              <th className="border">Agen</th>
              <th className="border">Kategori</th>
              <th className="border">Via</th>
              <th className="border">Catatan</th>
              <th className="border" style={{ width: '13rem' }}>
                Masuk
              </th>
              <th className="border" style={{ width: '13rem' }}>
                Keluar
              </th>
            </tr>
          </thead>

          <tbody>
            {rows?.length > 0 ? (
              rows.map((transaksi, idx) => {
                return (
                  <tr key={idx}>
                    <td className="border p-4">{idx + 1}</td>
                    <td className="border p-4">{transaksi.tgl ? moment(transaksi.tgl).format('DD-MM-YYYY') : '-'}</td>
                    <td className="border p-4">{`${transaksi.agen.no} - ${transaksi.agen.diri?.nama?.lengkap}`}</td>
                    <td className="border p-4">{startCase(transaksi.kategori)}</td>
                    <td className="border p-4">{startCase(transaksi?.via)}</td>
                    <td className="border p-4">{startCase(transaksi?.catatan)}</td>
                    <td className="border p-4">
                      {transaksi.jenis === JenisTransaksi.MASUK && `Rp. ${thousandSeparator(transaksi.nominal)}`}
                    </td>
                    <td className="border p-4">
                      {transaksi.jenis === JenisTransaksi.KELUAR && `Rp. ${thousandSeparator(transaksi.nominal)}`}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="border p-8" align="center">
                  Transaksi tidak ditemukan. . .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

export default withReducer('transaksiSaldo', reducer)(LaporanListTransaksiSaldo);
