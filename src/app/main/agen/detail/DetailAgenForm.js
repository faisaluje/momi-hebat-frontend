import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  }
}));

function DetailAgenForm(props) {
  const classes = useStyles(props);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);

  return (
    <FuseAnimateGroup
      enter={{
        animation: 'transition.slideDownIn',
        delay: 200,
        duration: 500
      }}
      className={clsx(classes.root, 'flex flex-wrap justify-between overflow-auto w-full')}
    >
      <div className="flex flex-col overflow-auto">
        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">No. Agen:</Typography>

          <Typography>{agen?.no || '-'}</Typography>
          {agen?.topAgen && (
            <Typography className="ml-24">
              (Agen Referral : <b>{agen.topAgen.diri?.nama?.lengkap || '-'}</b>)
            </Typography>
          )}
        </div>

        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">Nama:</Typography>

          <Typography>{agen?.diri?.nama?.lengkap || '-'}</Typography>
          {agen?.diri?.nama?.panggilan && <Typography className="ml-24">({agen.diri.nama.panggilan})</Typography>}
        </div>

        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">Alamat:</Typography>

          <Typography>{agen?.diri?.alamat?.jalan || '-'}</Typography>
        </div>

        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">No Telp.:</Typography>

          <Typography>{agen?.diri?.noTlp || '-'}</Typography>
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <Typography className="font-bold">Total Saldo :</Typography>
        <Typography>Rp. 5.000.000</Typography>
      </div>
    </FuseAnimateGroup>
  );
}

export default DetailAgenForm;
