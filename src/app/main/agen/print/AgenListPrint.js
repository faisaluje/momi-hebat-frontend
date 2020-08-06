import React from 'react';
import moment from 'moment';
import {
  Breadcrumbs,
  Icon,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  MenuItem,
  CircularProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@material-ui/pickers';
import { strOrStrip } from 'app/Utils';
import reducer from '../store/reducers';
import { refreshListAgen, setLevelAgen, setStatusAgen, setTglLahirAgen, setTxtCariAgen } from '../store/actions';
import AgenStatus from '../AgenStatus';
import AgenService from '../services/agen.service';

function AgenListPrint() {
  const dispatch = useDispatch();
  const { txtCari, status, level, tglLahir } = useSelector(({ agen }) => agen.table);
  const { periode } = useSelector(({ auth }) => auth.user.data);
  const [pencarian, setPencarian] = React.useState(txtCari);
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  console.log(rows);

  React.useEffect(() => {
    setIsLoading(true);
    AgenService.getListAgenData({
      status,
      nama: txtCari,
      level,
      detail: 1,
      tglLahir,
      limit: 'all'
    })
      .then(result => {
        if (result?.data?.docs?.length < 1) {
          return [];
        }

        return setRows(result.data.docs);
      })
      .finally(() => setIsLoading(false));
  }, [level, status, tglLahir, txtCari]);

  const submitPencarian = e => {
    if (e.key === 'Enter') {
      dispatch(setTxtCariAgen(pencarian));
    }
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
          <Link to="/agen" style={{ color: '#b20a0a' }}>
            Agen
          </Link>
          <Typography className="font-bold">Print</Typography>
        </Breadcrumbs>

        <div className="pt-8 w-full flex flex-wrap justify-between">
          <div className="flex flex-wrap items-center">
            <TextField
              label="Pencarian"
              placeholder="Ketik Disini..."
              size="small"
              variant="outlined"
              value={pencarian}
              onChange={event => setPencarian(event.target.value)}
              InputProps={{
                endAdornment: pencarian && (
                  <IconButton size="small" onClick={() => setPencarian('')}>
                    <Icon>close</Icon>
                  </IconButton>
                )
              }}
              onKeyPress={submitPencarian}
            />

            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Icon>search</Icon>}
              className="ml-0 sm:ml-8"
              onClick={() => dispatch(setTxtCariAgen(pencarian))}
            >
              Cari
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Icon>refresh</Icon>}
              className="ml-0 sm:ml-24"
              onClick={() => dispatch(refreshListAgen())}
            >
              Refresh
            </Button>
          </div>

          <div className="flex flex-wrap items-center">
            <DatePicker
              inputVariant="outlined"
              format="DD-MM-YYYY"
              clearable
              size="small"
              label="Tgl Lahir"
              value={tglLahir}
              className="w-128 mr-0 sm:mr-24"
              onChange={val => dispatch(setTglLahirAgen(val ? val.format('YYYY-MM-DD') : null))}
            />

            <TextField
              label="Level"
              select
              size="small"
              variant="outlined"
              className="w-96 mr-0 sm:mr-24"
              value={level}
              onChange={event => dispatch(setLevelAgen(event.target.value))}
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
              value={status}
              onChange={event => dispatch(setStatusAgen(event.target.value))}
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
              onClick={() => window.print()}
            >
              Cetak
            </Button>
          </div>
        </div>
      </div>

      <Paper
        elevation={3}
        className="flex flex-col w-xl mx-auto print:bg-white print:w-full mt-24 print:m-0 print:shadow-none p-24 print:p-0"
      >
        <div className="flex flex-row border-black border-b pb-16">
          <div className="flex items-center justify-center">
            <img width="128" src="assets/images/logos/momi-hebat.svg" alt="logo" />
          </div>
          <div className="flex flex-1 text-center items-center justify-center ml-8">
            <Typography className="font-black text-28">
              DAFTAR AGEN {status.toUpperCase()} {periode.referensi.judul?.toUpperCase()}
            </Typography>
          </div>
        </div>

        <table className="border-collapse mt-24 p-8 print:pr-24">
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
              rows.map((agen, idx) => (
                <tr key={idx}>
                  <td className="border p-4">{idx + 1}</td>
                  <td className="border p-4">{agen.no}</td>
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
              ))}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

export default withReducer('agen', reducer)(AgenListPrint);
