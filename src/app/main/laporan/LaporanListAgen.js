import React from 'react';
import moment from 'moment';
import { Breadcrumbs, Icon, Typography, Button, Paper, TextField, MenuItem, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import { strOrStrip } from 'app/Utils';
import Axios from 'axios';
import { URL_API } from 'app/Constants';
import reducer from '../agen/store/reducers';
import AgenStatus from '../agen/AgenStatus';
import AgenComboBox from '../agen/AgenComboBox';

function LaporanListAgen() {
  const { periode } = useSelector(({ auth }) => auth.user.data);
  const [rows, setRows] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [params, setParams] = React.useState({ status: 'aktif' });

  React.useEffect(() => {
    if (!rows || isRefresh) {
      setIsRefresh(false);
      setIsLoading(true);
      const newParams = { ...params };
      if (newParams.agen) {
        newParams.agenId = params.agen.id;
        delete newParams.agen;
      }
      Axios.get(`${URL_API}/agen/laporan`, { params: newParams, timeout: 30000 })
        .then(result => {
          setRows(result.data?.docs || []);
        })
        .catch(() => setRows([]))
        .finally(() => setIsLoading(false));
    }
  }, [isRefresh, params, rows]);

  const onChangeParams = value => {
    setParams(value);
    setIsRefresh(true);
  };

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

  let no = 0;

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
            <AgenComboBox
              className="min-w-224"
              variant="outlined"
              size="small"
              label="Agen"
              value={params?.agen}
              onChange={(_event, agen) => onChangeParams({ ...params, agen })}
            />

            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Icon>refresh</Icon>}
              className="ml-0 sm:ml-24"
              onClick={() => setIsRefresh(true)}
            >
              Refresh
            </Button>
          </div>

          <div className="flex flex-wrap items-center">
            <TextField
              label="Level"
              select
              size="small"
              variant="outlined"
              className="w-96 mr-0 sm:mr-24"
              value={params?.level || ''}
              onChange={event => onChangeParams({ ...params, level: event.target.value })}
            >
              <MenuItem value="">Semua</MenuItem>
              <MenuItem value={1}>Level 1</MenuItem>
              <MenuItem value={2}>Level 2</MenuItem>
              <MenuItem value={3}>Level 3</MenuItem>
            </TextField>

            <TextField
              select
              variant="outlined"
              style={{ width: '12rem' }}
              size="small"
              label="Status Agen"
              value={params?.status}
              onChange={event => onChangeParams({ ...params, status: event.target.value })}
            >
              {Object.values(AgenStatus).map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

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
              DAFTAR AGEN {params.status.toUpperCase()} {periode.referensi.judul?.toUpperCase()}
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
              <th className="border">No. Agen</th>
              <th className="border">Nama</th>
              <th className="border">TTL</th>
              <th className="border">Alamat</th>
              <th className="border">Agen Referral</th>
              <th className="border">No. Telp.</th>
            </tr>
          </thead>

          <tbody>
            {rows?.length > 0 &&
              rows.map((agen, idx) => {
                no += 1;

                return (
                  <React.Fragment key={idx}>
                    <tr>
                      <td className="border p-4">{no}</td>
                      <td className="border p-4" align="right">
                        {agen.no}
                      </td>
                      <td className="border p-4">{agen.diri?.nama?.lengkap}</td>
                      <td className="border p-4">{`${agen.diri?.lahir?.tempat || '-'}${
                        agen.diri?.lahir?.tanggal ? `, ${moment(agen.diri?.lahir?.tanggal).format('DD-MM-YYYY')}` : ''
                      }`}</td>
                      <td className="border p-4">{`${agen.diri.alamat?.jalan || '-'}${
                        agen.diri.alamat?.rt ? `, RT ${agen.diri.alamat?.rt}` : ''
                      }${agen.diri.alamat?.rw ? `, RW ${agen.diri.alamat?.rw}` : ''}${
                        agen.diri.alamat?.kelurahan ? `, Kel. ${agen.diri.alamat?.kelurahan}` : ''
                      }${agen.diri.alamat?.kecamatan ? `, Kec. ${agen.diri.alamat?.kecamatan}` : ''}${
                        agen.diri.alamat?.kabKota ? `, Kab/Kota ${agen.diri.alamat?.kabKota}` : ''
                      }`}</td>
                      <td className="border p-4">
                        {agen.topAgen ? `${agen.topAgen.no}. ${agen.topAgen.diri?.nama?.lengkap}` : '-'}
                      </td>
                      <td className="border p-4">{strOrStrip(agen.diri?.noTlp)}</td>
                    </tr>
                    {agen.subAgens?.length > 0 &&
                      agen.subAgens.map((subAgen, idx2) => {
                        no += 1;

                        return (
                          <React.Fragment key={idx2}>
                            <tr>
                              <td className="border p-4">{no}</td>
                              <td className="border p-4" align="right">
                                {subAgen.no}
                              </td>
                              <td className="border p-4">{subAgen.diri?.nama?.lengkap}</td>
                              <td className="border p-4">{`${subAgen.diri?.lahir?.tempat || '-'}${
                                subAgen.diri?.lahir?.tanggal
                                  ? `, ${moment(subAgen.diri?.lahir?.tanggal).format('DD-MM-YYYY')}`
                                  : ''
                              }`}</td>
                              <td className="border p-4">{`${subAgen.diri.alamat?.jalan || '-'}${
                                subAgen.diri.alamat?.rt ? `, RT ${subAgen.diri.alamat?.rt}` : ''
                              }${subAgen.diri.alamat?.rw ? `, RW ${subAgen.diri.alamat?.rw}` : ''}${
                                subAgen.diri.alamat?.kelurahan ? `, Kel. ${subAgen.diri.alamat?.kelurahan}` : ''
                              }${subAgen.diri.alamat?.kecamatan ? `, Kec. ${subAgen.diri.alamat?.kecamatan}` : ''}${
                                subAgen.diri.alamat?.kabKota ? `, Kab/Kota ${subAgen.diri.alamat?.kabKota}` : ''
                              }`}</td>
                              <td className="border p-4">{`${agen.no}. ${agen.diri?.nama?.lengkap}`}</td>
                              <td className="border p-4">{strOrStrip(subAgen.diri?.noTlp)}</td>
                            </tr>

                            {subAgen.subAgens?.length > 0 &&
                              subAgen.subAgens.map((subAgen2, idx3) => {
                                no += 1;

                                return (
                                  <tr>
                                    <td className="border p-4">{no}</td>
                                    <td className="border p-4" align="right">
                                      {subAgen2.no}
                                    </td>
                                    <td className="border p-4">{subAgen2.diri?.nama?.lengkap}</td>
                                    <td className="border p-4">{`${subAgen2.diri?.lahir?.tempat || '-'}${
                                      subAgen2.diri?.lahir?.tanggal
                                        ? `, ${moment(subAgen2.diri?.lahir?.tanggal).format('DD-MM-YYYY')}`
                                        : ''
                                    }`}</td>
                                    <td className="border p-4">{`${subAgen2.diri.alamat?.jalan || '-'}${
                                      subAgen2.diri.alamat?.rt ? `, RT ${subAgen2.diri.alamat?.rt}` : ''
                                    }${subAgen2.diri.alamat?.rw ? `, RW ${subAgen2.diri.alamat?.rw}` : ''}${
                                      subAgen2.diri.alamat?.kelurahan ? `, Kel. ${subAgen2.diri.alamat?.kelurahan}` : ''
                                    }${
                                      subAgen2.diri.alamat?.kecamatan ? `, Kec. ${subAgen2.diri.alamat?.kecamatan}` : ''
                                    }${
                                      subAgen2.diri.alamat?.kabKota ? `, Kab/Kota ${subAgen2.diri.alamat?.kabKota}` : ''
                                    }`}</td>
                                    <td className="border p-4">{`${subAgen.no}. ${subAgen.diri?.nama?.lengkap}`}</td>
                                    <td className="border p-4">{strOrStrip(subAgen2.diri?.noTlp)}</td>
                                  </tr>
                                );
                              })}
                          </React.Fragment>
                        );
                      })}
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

export default withReducer('agen', reducer)(LaporanListAgen);
