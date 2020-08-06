import React from 'react';
import { Breadcrumbs, Icon, Typography, Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import History from '@history';
import { strOrStrip } from 'app/Utils';
import moment from 'moment';
import reducer from '../store/reducers';

function AgenDetailPrint() {
  const { data } = useSelector(({ agen }) => agen.form);
  const { periode } = useSelector(({ auth }) => auth.user.data);

  if (!data) {
    History.push('/agen');
    return null;
  }

  return (
    <>
      <div className="p-8 print:hidden flex sticky top-0 bg-gray-100">
        <div className="flex">
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
        </div>

        <div className="flex flex-1 flex-row-reverse">
          <Button variant="contained" color="primary" startIcon={<Icon>print</Icon>} onClick={() => window.print()}>
            Print
          </Button>
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
            <Typography className="font-black text-28">DATA AGEN {periode.referensi.judul?.toUpperCase()}</Typography>
          </div>
        </div>

        <Paper
          className="flex w-c mt-24 ml-12 text-16 text-white font-extrabold text-20 px-12 py-8"
          style={{ backgroundColor: '#b20a0a', width: 'fit-content' }}
          variant="outlined"
          square
        >
          Data Diri
        </Paper>

        <div className="flex flex-col mt-24 border border-black p-8">
          <div className="flex items-center">
            <Typography className="w-192">Nama Lengkap</Typography>
            <Typography>: {strOrStrip(data.diri.nama?.lengkap)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Nama panggilan</Typography>
            <Typography>: {strOrStrip(data.diri.nama?.panggilan)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Alamat Lengkap</Typography>
            <Typography>: {strOrStrip(data.diri.alamat?.jalan)}</Typography>
          </div>

          <div className="flex items-center">
            <div className="w-192" />
            <Typography className="ml-8">RT : {strOrStrip(data.diri.alamat?.rt)}</Typography>
            <Typography className="ml-8">RW : {strOrStrip(data.diri.alamat?.rw)}</Typography>
            <Typography className="ml-8">Kelurahan : {strOrStrip(data.diri.alamat?.keluraha)}</Typography>
          </div>

          <div className="flex items-center">
            <div className="w-192" />
            <Typography className="ml-8">Kecamatan : {strOrStrip(data.diri.alamat?.kecamatan)}</Typography>
          </div>

          <div className="flex items-center">
            <div className="w-192" />
            <Typography className="ml-8">Kab / Kota : {strOrStrip(data.diri.alamat?.kabKota)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Tempat, Tanggal Lahir</Typography>
            <Typography>
              : {strOrStrip(data.diri.lahir?.tempat)}
              {data.diri.lahir?.tanggal ? `, ${moment(data.diri.lahir?.tanggal).format('DD MMMM YYYY')}` : ''}
            </Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Pekerjaan</Typography>
            <Typography>: {strOrStrip(data.diri.pekerjaan)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">No. Telp</Typography>
            <Typography>: {strOrStrip(data.diri.noTlp)}</Typography>
          </div>
        </div>

        <Paper
          className="flex w-c mt-24 ml-12 text-16 text-white font-extrabold text-20 px-12 py-8"
          style={{ backgroundColor: '#b20a0a', width: 'fit-content' }}
          variant="outlined"
          square
        >
          Data Keluarga
        </Paper>

        <div className="flex flex-col mt-24 border border-black p-8">
          <div className="flex items-center">
            <Typography className="w-192">Nama Lengkap</Typography>
            <Typography>: {strOrStrip(data.keluarga?.nama?.lengkap)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Nama panggilan</Typography>
            <Typography>: {strOrStrip(data.keluarga?.nama?.panggilan)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Alamat Lengkap</Typography>
            <Typography>: {strOrStrip(data.keluarga?.alamat?.jalan)}</Typography>
          </div>

          <div className="flex items-center">
            <div className="w-192" />
            <Typography className="ml-8">RT : {strOrStrip(data.keluarga?.alamat?.rt)}</Typography>
            <Typography className="ml-8">RW : {strOrStrip(data.keluarga?.alamat?.rw)}</Typography>
            <Typography className="ml-8">Kelurahan : {strOrStrip(data.keluarga?.alamat?.keluraha)}</Typography>
          </div>

          <div className="flex items-center">
            <div className="w-192" />
            <Typography className="ml-8">Kecamatan : {strOrStrip(data.keluarga?.alamat?.kecamatan)}</Typography>
          </div>

          <div className="flex items-center">
            <div className="w-192" />
            <Typography className="ml-8">Kab / Kota : {strOrStrip(data.keluarga?.alamat?.kabKota)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Tempat, Tanggal Lahir</Typography>
            <Typography>
              : {strOrStrip(data.keluarga?.lahir?.tempat)}
              {data.keluarga?.lahir?.tanggal ? `, ${moment(data.keluarga?.lahir?.tanggal).format('DD MMMM YYYY')}` : ''}
            </Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">Pekerjaan</Typography>
            <Typography>: {strOrStrip(data.keluarga?.pekerjaan)}</Typography>
          </div>

          <div className="flex items-center mt-12">
            <Typography className="w-192">No. Telp</Typography>
            <Typography>: {strOrStrip(data.keluarga?.noTlp)}</Typography>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default withReducer('agen', reducer)(AgenDetailPrint);
