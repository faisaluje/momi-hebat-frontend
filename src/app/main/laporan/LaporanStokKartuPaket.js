import { Breadcrumbs, Button, CircularProgress, Icon, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import { thousandSeparator } from 'app/Utils';
import { sumBy } from 'lodash';
import withReducer from '../../store/withReducer';
import { getListKartuPaket, refreshListKartuPaket } from '../kartuPaket/store/actions';
import reducer from '../kartuPaket/store/reducers';
import { strOrStrip } from '../../Utils';

function LaporanStokKartuPaket() {
  const dispatch = useDispatch();
  const { periode } = useSelector(({ auth }) => auth.user.data);
  const { isRefresh, isLoading, data, periodeId } = useSelector(({ kartuPaket }) => kartuPaket.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListKartuPaket(periodeId));
    }
  }, [dispatch, isRefresh, periodeId]);

  React.useEffect(() => {
    if (data) {
      setRows(data);
    } else {
      setRows([]);
    }
  }, [data]);

  const onPrint = () => {
    const css = '@page { size: A4 landscape; max-height:100%; max-width:100% }';
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
          <Typography className="font-bold">List Agen</Typography>
        </Breadcrumbs>

        <div className="pt-8 w-full flex flex-wrap justify-between">
          <div className="flex flex-wrap items-center">
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Icon>refresh</Icon>}
              className="ml-0 sm:ml-24"
              onClick={() => refreshListKartuPaket()}
            >
              Refresh
            </Button>
          </div>

          <div className="flex flex-wrap items-center">
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
        className="flex flex-col w-3xl mx-auto print:w-full mt-24 print:m-0 print:shadow-none p-24 print:p-0"
      >
        <div className="flex flex-row border-black border-b pb-16">
          <div className="flex items-center justify-center">
            <img width="128" src="assets/images/logos/momi-hebat.svg" alt="logo" />
          </div>

          <div className="flex flex-1 flex-col text-center items-center justify-center ml-8">
            <Typography className="font-black text-24">
              STOK KARTU PAKET {periode.referensi.judul?.toUpperCase()}
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

        <table className="border-collapse mt-24 p-8">
          <thead>
            <tr>
              <th className="border">No.</th>
              <th className="border">Nama Kartu Paket</th>
              <th className="border">Stok Masuk</th>
              <th className="border">Stok Keluar</th>
              <th className="border">Stok Tersedia</th>
            </tr>
          </thead>

          <tbody>
            {rows?.length > 0 &&
              rows.map((kartuPaket, idx) => {
                return (
                  <tr key={idx}>
                    <td className="border p-4">{idx + 1}</td>
                    <td className="border p-4">{kartuPaket._id.nama}</td>
                    <td className="border p-4" align="center">
                      {thousandSeparator(kartuPaket.stokMasuk)}
                    </td>
                    <td className="border p-4" align="center">
                      {thousandSeparator(kartuPaket.stokKeluar)}
                    </td>
                    <td className="border p-4" align="center">
                      {thousandSeparator(kartuPaket._id.stok)}
                    </td>
                  </tr>
                );
              })}

            {rows?.length > 0 && (
              <tr>
                <td colSpan={2} align="center" className="border font-bold p-8 italic">
                  TOTAL :
                </td>
                <td align="center" className="border font-bold p-8 italic">
                  {thousandSeparator(sumBy(rows, 'stokMasuk'))}
                </td>
                <td align="center" className="border font-bold p-8 italic">
                  {thousandSeparator(sumBy(rows, 'stokKeluar'))}
                </td>
                <td align="center" className="border font-bold p-8 italic">
                  {thousandSeparator(sumBy(rows, '_id.stok'))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

export default withReducer('kartuPaket', reducer)(LaporanStokKartuPaket);
